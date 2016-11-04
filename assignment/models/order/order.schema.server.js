module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var OrderSchema = Schema({
        _page: {type: Schema.Types.ObjectId, ref: 'User'},
        SlNo: String,
        description: String,
        diameter: String,
        clothdesc: String,
        color:String,
        actualWeight:Number,
        pdcWeight:Number,
        actualRolls:Number,
        pdcRolls:Number,
        uom:String,
        Remarks:String,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "order"});

    return OrderSchema;
}