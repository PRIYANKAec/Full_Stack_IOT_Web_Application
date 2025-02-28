import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card1";
import { motion } from "framer-motion";

const Tutorial = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="px-2 sm:px-4 lg:px-8 xl:px-12 mt-8"
    >
      <Card className="shadow-xl">
        <CardHeader className="bg-foreground text-secondary rounded-t-lg pb-3">
          <CardTitle className="text-xl font-bold mb-0 text-center">
            Getting Started: Sending Data from Hardware
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6 px-4 md:px-8 bg-secondary rounded-b-lg">
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">Introduction</h2>
            <p className="mb-4">
              This guide will help you connect your hardware devices (ESP32,
              Raspberry Pi) to our platform, manage projects, and send sensor
              data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">Prerequisites</h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                WiFi-enabled microcontroller (ESP32, ESP8266, Raspberry Pi)
              </li>
              <li>Internet connection</li>
              <li>Power supply for microcontroller</li>
              <li>
                Basic knowledge of microcontroller programming(Embedded C,
                Python,etc,.)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">Workflow Overview</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>Create an account and log in.</li>
              <li>Navigate to the Projects page via the sidebar.</li>
              <li>Create and manage your projects (Create, List, Delete).</li>
              <li>Click "Explore" on a project to go to Live Tracking.</li>
              <li>
                Manage sensors (Create, Edit, List, Delete) within each project.
              </li>
              <li>
                Input sensors: Toggle switch to change hardware state in
                real-time.
              </li>
              <li>
                Output sensors: View data in gauges, bar charts, line charts,
                and tables.
              </li>
              <li>Real-time updates via Socket.io integration.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">API Endpoints</h2>
            <ul className="list-disc list-inside mb-4 break-all">
              <li>
                Get sensor data:
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                <code>
                  POST /api/projects/:projectName/sensors/:sensorName/getValue
                </code>
                </pre>
              </li>
              <li>
                Send sensor data:{" "}
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                <code>
                  POST /api/projects/:projectName/sensors/:sensorName/sendValue
                </code>
                </pre>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg tex font-bold mb-2">
              Sending Sensor Data
            </h2>
            <Tabs defaultValue="esp32" className="flex flex-col items-center">
              <TabsList className="mb-4 flex justify-center w-[240px]">
                <TabsTrigger value="esp32">ESP32/ESP8266</TabsTrigger>
                <TabsTrigger value="raspberry-pi">Raspberry Pi</TabsTrigger>
              </TabsList>

              <TabsContent value="esp32">
                <h2 className="text-lg font-semibold mb-2">
                  ESP32/ESP8266 Code
                </h2>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code className="whitespace-pre-wrap break-all">
                  {`#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "your_SSID";     // Replace with your Wi-Fi SSID
const char* password = "your_PASSWORD"; // Replace with your Wi-Fi Password

const char* serverUrl = "https://iot.bitsathy.ac.in/api/projects/your_project_name/sensors/your_sensor_name/sendValue"; // Replace your_project_name, your_sensor_name with actual values

#define RELAY_PIN  2 // Change this to the GPIO pin controlling the relay
bool lastSwitchState = false;

void setup() {
    Serial.begin(115200);
    pinMode(RELAY_PIN, OUTPUT); // Set the relay pin as output
    digitalWrite(RELAY_PIN, LOW); // Start with relay OFF

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\\nConnected to WiFi!");
}

void getLatestSensorData() {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");
        http.addHeader("Authorization", "Bearer your_token");

        // Create JSON object for request body
        StaticJsonDocument<200> requestBody;
        requestBody["id"] = 1;
        
        String requestData;
        serializeJson(requestBody, requestData);

        // Send POST request
        int httpResponseCode = http.POST(requestData);

        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println("Response: " + response);

            // Use DynamicJsonDocument to handle large JSON
            DynamicJsonDocument jsonDoc(4096); // Increase buffer size
            DeserializationError error = deserializeJson(jsonDoc, response);
            
            if (error) {
                Serial.print("JSON Parse Error: ");
                Serial.println(error.f_str());
                return;
            }

            // Check if data array exists and has elements
            if (jsonDoc["data"].size() > 0) {
                int lastIndex = jsonDoc["data"].size() - 1; // Get the last index
                int latestValue = jsonDoc["data"][lastIndex]["value"]; // Read last value

                Serial.print("Latest Sensor Value: ");
                Serial.println(latestValue);

                // Update relay state based on the latest value
                if (latestValue == 1) {
                    digitalWrite(RELAY_PIN, HIGH);
                } else {
                    digitalWrite(RELAY_PIN, LOW);
                }
            } else {
                Serial.println("No sensor data available.");
            }
        } else {
            Serial.print("Error in HTTP request: ");
            Serial.println(httpResponseCode);
        }

        http.end();
    } else {
        Serial.println("WiFi Disconnected!");
    }
}

void loop() {
    getLatestSensorData();
    delay(2000); // Check switch state every second
}`}
                  </code>
                </pre>
              </TabsContent>

              <TabsContent value="raspberry-pi">
                <h2 className="text-lg font-semibold mb-2">
                  Raspberry Pi Code
                </h2>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code className="whitespace-pre-wrap break-all">
                  {`import requests
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
    main()`}
                  </code>
                </pre>
              </TabsContent>
            </Tabs>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Tutorial;
