export const esp_code =`#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi Credentials
const char* ssid = "your_SSID";     
const char* password = "your_PASSWORD"; 

// API Endpoints
const char* getUrl = "https://iot.bitsathy.ac.in/api/projects/your_project/sensors/switch/getValue"; 
const char* sendUrl = "https://iot.bitsathy.ac.in/api/projects/your_project/sensors/switch/sendValue"; 
const char* sensorSendUrl = "https://iot.bitsathy.ac.in/api/projects/your_project/sensors/temperature/sendValue";

// Hardware Pins
#define SWITCH_PIN  5  // GPIO pin for the switch
#define RELAY_PIN   2  // GPIO pin for the relay
#define SENSOR_PIN  34 // GPIO pin for sensor (example: temperature)

// Variables
bool lastSwitchState = false; // Stores last switch state
int lastSensorValue = 0;      // Stores last sensor value

void setup() {
    Serial.begin(115200);
    pinMode(SWITCH_PIN, INPUT_PULLUP); // Switch input with pull-up
    pinMode(RELAY_PIN, OUTPUT);        // Relay output
    digitalWrite(RELAY_PIN, LOW);      // Start with relay OFF

    // Connect to WiFi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi!");
}

// Function to get the latest switch state from API
void getSwitchStateFromAPI() {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(getUrl);
        http.addHeader("Content-Type", "application/json");
        http.addHeader("Authorization", "Bearer your_token");

        // Send POST request with empty JSON
        StaticJsonDocument<200> requestBody;
        requestBody["id"] = 1;
        
        String requestData;
        serializeJson(requestBody, requestData);
        
        int httpResponseCode = http.POST(requestData);

        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println("Response: " + response);

            // Parse JSON
            DynamicJsonDocument jsonDoc(1024);
            DeserializationError error = deserializeJson(jsonDoc, response);
            if (error) {
                Serial.print("JSON Parse Error: ");
                Serial.println(error.f_str());
                return;
            }

            // Read switch state
            if (jsonDoc["data"].size() > 0) {
                int lastIndex = jsonDoc["data"].size() - 1;
                int latestValue = jsonDoc["data"][lastIndex]["value"];

                Serial.print("Latest Switch State: ");
                Serial.println(latestValue);

                // Control Relay Based on API Switch State
                digitalWrite(RELAY_PIN, latestValue);
                lastSwitchState = latestValue;
            }
        } else {
            Serial.print("HTTP Request Failed: ");
            Serial.println(httpResponseCode);
        }
        http.end();
    } else {
        Serial.println("WiFi Disconnected!");
    }
}

// Function to send switch state to API
void sendSwitchStateToAPI(bool state) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(sendUrl);
        http.addHeader("Content-Type", "application/json");

        // Create JSON Data
        StaticJsonDocument<200> jsonDoc;
        jsonDoc["value"] = state;

        String jsonString;
        serializeJson(jsonDoc, jsonString);

        // Send POST request
        int httpResponseCode = http.POST(jsonString);
        Serial.print("Sent Switch State: ");
        Serial.println(state);
        Serial.println("HTTP Response Code: " + String(httpResponseCode));

        http.end();
    }
}

// Function to send sensor data to API
void sendSensorDataToAPI(int sensorValue) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(sensorSendUrl);
        http.addHeader("Content-Type", "application/json");

        // Create JSON Data
        StaticJsonDocument<200> jsonDoc;
        jsonDoc["value"] = sensorValue;

        String jsonString;
        serializeJson(jsonDoc, jsonString);

        // Send POST request
        int httpResponseCode = http.POST(jsonString);
        Serial.print("Sent Sensor Value: ");
        Serial.println(sensorValue);
        Serial.println("HTTP Response Code: " + String(httpResponseCode));

        http.end();
    }
}

void loop() {
    // 1️⃣ **Check switch state from API & Update Relay**
    getSwitchStateFromAPI();

    // 2️⃣ **Check if hardware switch is changed & Update API**
    bool switchState = digitalRead(SWITCH_PIN);  
    if (switchState != lastSwitchState) {  
        sendSwitchStateToAPI(switchState);
        lastSwitchState = switchState;
    }

    // 3️⃣ **Read sensor value & Send to API periodically**
    int sensorValue = analogRead(SENSOR_PIN);
    if (abs(sensorValue - lastSensorValue) > 10) { // Update only if there's a significant change
        sendSensorDataToAPI(sensorValue);
        lastSensorValue = sensorValue;
    }

    delay(2000); // Check every 2 seconds
}
`

export const python_code = `import requests
import time
import Adafruit_DHT

DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4

def send_sensor_data(value):
    url = "http://your_server_url/api/projects/your_project_name/sensors/your_sensor_name/sendValue"
    headers = {'Content-Type': 'application/json'}
    data = {'value': value}
    response = requests.post(url, json=data, headers=headers)
    print(response.status_code, response.json())

def main():
    while True:
        humidity, temperature = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
        if humidity is not None and temperature is not None:
            print(f"Temp={temperature:.1f}C  Humidity={humidity:.1f}%")
            send_sensor_data(temperature)
        time.sleep(60)

if __name__ == "__main__":
    main()`
    