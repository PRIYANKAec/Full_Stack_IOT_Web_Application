const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SensorModel {
    static async createSensor(sensorData) {
        return await prisma.sensor.create({
            data: sensorData
        })
    }

    static async findSensorById(id) {
        return await prisma.sensor.findUnique({
            where: { id }
        })
    }

    static async findSensorByName(name) {
        return await prisma.sensor.findFirst({
            where: { name }
        })
    }
    
    static async findByProjectId(projectId) {
        return await prisma.sensor.findMany({
            where: { projectId }
        });
    }

    static async getAllSensors() {
        return await prisma.sensor.findMany();
    }

    static async updateSensor(id, sensorData) {
        return await prisma.sensor.update({
            where: { id },
            data: sensorData
        });
    }

    static async deleteSensor(id) {
        return await prisma.sensor.delete({
            where: { id }
        });
    }

    //send sensor data
    static async createSensorData(sensorData) {
        return await prisma.sensorData.create({
            data: sensorData
        });
    }

    // find sensor data by id
    static async findSensorDataById(id) {
        return await prisma.sensorData.findUnique({
            where: { id }
        });
    }

    // find sensor data by ids
    static async findSensorDataByIds(ids) {
        return await prisma.sensorData.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
    }

    //delete sensor data
    static async deleteSensorData(id) {
        return await prisma.sensorData.delete({
            where: { id }
        });
    }

    //delete multiple sensor data
    static async deleteMultipleSensorData(ids) {
        return await prisma.sensorData.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
    }
}

module.exports = SensorModel