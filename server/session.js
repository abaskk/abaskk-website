class Session {
    constructor(uuid, expiryTime) {
      this.uuid = uuid;
      this.expiry = expiryTime;
    }

    hasExpired(){
        return this.expiry < (new Date())
    }

  }

  module.exports = Session