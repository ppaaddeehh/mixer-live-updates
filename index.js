'use strict'

const Carina = require("carina").Carina;
const ws = require("ws");

const EventEmitter = require('events').EventEmitter;
const assert = require('assert');

Carina.WebSocket = ws;

class mixerClient extends EventEmitter{
    constructor(streamerId, clientId){
        super();
        try{
            assert(streamerId);
            assert(clientId);
        } catch(error) {
            throw new error('')
        }

        this.streamerId = streamerId;
        this.clientId = clientId

        this.ca = new Carina({
            queryString: {
                "Client-ID": this.clientId
            },
            isBot: true
        }).open();

    }

    _subscribeStreamer(streamerId){
        this.ca.subscribe(`channel:${streamerId}:update`, data => {
            if (typeof data.viewersCurrent !== "undefined") {
                this.emit("viewerCount", { viewerCount: data.viewersCurrent });
              }
              if (typeof data.online !== "undefined" && data.online == true) {
                this.emit("onlineNotification", data.online);
              }
              if (typeof data.online !== "undefined" && data.online == false) {
                this.emit("offlineNotification", data.online);
            }
        })
    }
}

module.exports = mixerClient