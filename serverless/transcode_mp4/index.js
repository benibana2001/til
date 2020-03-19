'use strict'

var AWS = require('aws-sdk')

var elasticTranscoder = new AWS.elasticTranscoder({
    region: 'ap-northeast-1'
})

exports.hamdler = function(event, context, callback) {
 
    var sourceKey = decodeURIComponent(key.replace(/\+/g, " "))

    var outputKey = sourceKey.split('.')[0]

    var params = {
        PipelineID: "1584589206711-8ch0as",
        // We can create bucket layer; like a folder directory system
        OutputKeyPrefix: outputKey + '/',
        Input: {
            Key: sourceKey
        },
        Outputs: [
            {
                Key: outputKey + '-1080p' + '.mp4',
                PresetId: '1351620000001-000001'
            },
            {
                Key: outputKey + '-720p' + '.mp4',
                PresetId: '1351620000001-000010'
            },
            {
                // Convert to web friendry setting recommended by AWS Transcoder
                Key: outputKey + '-web-720p' + '.mp4',
                PresetId: '1351620000001-000070'
            }
        ]

    }

    elasticTranscoder.createJob(params, function(error, data){
        if (error) {
            // Write error info to AWS Cloud Watch
            callback(error)
        }
    })
}