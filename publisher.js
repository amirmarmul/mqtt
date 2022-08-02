const mqtt = require('mqtt')
const clientId = 'mqtt_' + Math.random().toString(8).slice(3)
const client = mqtt.connect(process.env.BROKER_URL, { clientId, clean: false, reconnectPeriod: 1 })

const topicName = 'test/temperature'

client.on('connect', function (connack) {
    console.log('client connected', connack)

    setInterval(() => {
        const payload = { 
            clientId,
            createdAt: new Date(),
            temparature: Math.random(),  
        }

        client.publish(topicName, JSON.stringify(payload), { qos: 1, retain: true }, (_, error) => {
            if (error) console.log(error, 'MQTT publish packet')
        })
    }, 5000)
})

client.on('error', function (error) {
    console.log('Error:', error)

    if (error.code == 'ENOTFOUND') {
        console.log('Network error, make sure you have an active internet connection')
    }
})

client.on('close', function () {
    console.log('Connection closed by client')
})

client.on('reconnect', function () {
    console.log('Client trying a reconnection')
})

client.on('offline', function () {
    console.log('Client is currently offline')
})
