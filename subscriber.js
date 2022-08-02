const mqtt = require('mqtt')
const clientId = 'mqtt_' + Math.random().toString(8).slice(3)
const client = mqtt.connect(process.env.BROKER_URL, { clientId, clean: false, reconnectPeriod: 1 })

const topicName = 'test/temperature'

client.on('connect', function () {
    client.subscribe(topicName, (error, granted) => {
        if (error) console.log(error, 'err')
        console.log(granted, 'granted')
    })
})

client.on('message', (topic, message, packet) => {
    // console.log(packet, packet.payload.toString())
    if (topic === topicName) {
        console.log(JSON.parse(message))
    }
})

client.on('packetsend', (packet) => {
    console.log(packet, 'packet2')
})
