#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 5
#define RST_PIN 22

MFRC522 rfid(SS_PIN, RST_PIN);

// WIFI
const char* ssid = "Airtel_Krishna";
const char* password = "Prasu@443";

// BACKEND
const char* ISSUE_URL  = "http://10.165.53.132:3000/issue-session";
const char* RETURN_URL = "http://10.165.53.132:3000/return-session";

// SESSION CONTROL
bool issueMode = false;
bool returnMode = false;
bool sessionActive = false;

String studentUID = "";
String books[10];
int bookCount = 0;

// ---------------- UID UTILS ----------------
String uidToString(MFRC522::Uid uid) {
  String s = "";
  for (byte i = 0; i < uid.size; i++) {
    if (uid.uidByte[i] < 0x10) s += "0";
    s += String(uid.uidByte[i], HEX);
  }
  s.toUpperCase();
  return s;
}

bool alreadyScanned(String uid) {
  for (int i = 0; i < bookCount; i++) {
    if (books[i] == uid) return true;
  }
  return false;
}

void resetSession() {
  sessionActive = false;
  studentUID = "";
  bookCount = 0;
}

// ---------------- SEND SESSION ----------------
void sendSession() {

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected!");
    return;
  }

  HTTPClient http;

  String url = issueMode ? ISSUE_URL : RETURN_URL;

  http.begin(url);
  http.setTimeout(10000);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Connection", "close");

  String payload = "{\"student_uid\":\"" + studentUID + "\",\"book_uids\":[";

  for (int i = 0; i < bookCount; i++) {
    payload += "\"" + books[i] + "\"";
    if (i < bookCount - 1) payload += ",";
  }

  payload += "]}";

  Serial.println("\n→ SENDING TO BACKEND");
  Serial.println(payload);

  int code = http.POST(payload);

  Serial.print("HTTP Code: ");
  Serial.println(code);

  if (code > 0) {
    String response = http.getString();
    Serial.println("Backend Response:");
    Serial.println(response);
  } else {
    Serial.print("HTTP Error: ");
    Serial.println(code);
  }

  http.end();
}

// ---------------- SETUP ----------------
void setup() {

  Serial.begin(115200);

  SPI.begin(18, 19, 23, SS_PIN);
  rfid.PCD_Init();

  Serial.println("RFID Reader Ready");

  WiFi.begin(ssid, password);

  Serial.print("Connecting WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected");

  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());

  Serial.println("\nSelect Mode:");
  Serial.println("1 → Issue Books");
  Serial.println("2 → Return Books");
}

// ---------------- LOOP ----------------
void loop() {

  // MODE SELECTION
  if (Serial.available()) {

    char ch = Serial.read();

    if (ch == '1') {
      issueMode = true;
      returnMode = false;
      Serial.println("\nISSUE MODE SELECTED");
    }

    if (ch == '2') {
      issueMode = false;
      returnMode = true;
      Serial.println("\nRETURN MODE SELECTED");
    }
  }

  if (!issueMode && !returnMode) return;

  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  String uid = uidToString(rfid.uid);

  Serial.print("Scanned UID: ");
  Serial.println(uid);

  delay(800);

  // SESSION START
  if (!sessionActive) {

    studentUID = uid;
    sessionActive = true;
    bookCount = 0;

    Serial.println("SESSION STARTED (Student Card)");

    rfid.PICC_HaltA();
    return;
  }

  // SESSION END
  if (uid == studentUID) {

    Serial.println("SESSION ENDED");

    sendSession();
    resetSession();

    issueMode = false;
    returnMode = false;

    Serial.println("\nSelect Mode:");
    Serial.println("1 → Issue Books");
    Serial.println("2 → Return Books");

    rfid.PICC_HaltA();
    return;
  }

  // DUPLICATE BOOK
  if (alreadyScanned(uid)) {

    Serial.println("❌ DUPLICATE BOOK");

    rfid.PICC_HaltA();
    return;
  }

  // ADD BOOK
  if (bookCount < 10) {

    books[bookCount++] = uid;
    Serial.println("BOOK ADDED");
  }

  rfid.PICC_HaltA();
}