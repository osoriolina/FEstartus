const mongoose = require('mongoose')
const mongooseAutopopulate = require('mongoose-autopopulate')

const types = mongoose.Schema.Types;

const companySchema = new mongoose.Schema({

    _id: types.ObjectId,
    logo: types.String,
    name: {
        type: types.String,
        require: true
    },
    tagline: types.String,
    website: types.String,
    description: types.String,
    companyOrStartup: {
        type: types.String,
        require: true,
        enum: ["Company", "Startup"]
    },
    industry: {
        type: types.String,
        require: true,
        enum: ["Agriculture", "Advertising", "Aviation", "Alternative Energy Production", "Architecture",
                "Automotive", "Attorneys/Law", "Banking", "Broadcasters/Radio/TV", "Chemical & Related",
             "Communication", "Computer Software", "Construction", "Education", "Electronics", "Energy & Natural Resources",
              "Entertainment Industry", "Environment", "Farming", "Food", "Foreign & Defense Policy", "Forestry", 
            "Foundations Philanthropists & Non Profits", "Garbage Collection/Waste Management", "Gas & Oil", "General Contractors", "Graphic Design and Illustrators",
            "Health","Higher Education", "Hotels & Tourism", "Human Rights", "Insurance", "Internet", "Music Production", "Marketing & Communication",
        "Newspaper & Magazine", "Pharmaceutical", "Real State", "Record Companies (Music Industry)", "Restaurants", "Retail",
        "Sports", "Textiles", "Transportation", "TV/Movies/Music", "Other"]
    },
    companySize: {
        type: types.String,
        require: true,
        enum: ["0 to 1 employee", "2 to 10 employees", "11 to 30 employees", "31 to 50 employees", "51 to 200 employees", "201 to 500 employees", "500 +"]
        
    },
    companyType: {
        type: types.String,
        require: true,
        enum: ["Educational Institution", "Government Agency", "Nonprofit", "Partnership", "Private Held", "Public Company", "Self-Employed", "Sole Propiertorship"]
    },
    yearFounded: {
        type: types.Date,
        require: true
    }, 
    expertise: [{
        type: types.String
    }],

    //to select more than one 
    languages: [{
        type: types.String,
        require: true,
        enum: ["English", "Spanish", "Catalan", "German", "Portuguese", "French", "Italian", "Arabic", "Russian", "Other"]
    }],
    country: types.String,
    city: types.String,
    address: types.String,
    phone: types.String,
    email: {
        type: types.String,
        require: true
    }, 
    user: {
        type: types.ObjectId,
        ref: 'User',
        autopopulate: true
    }
})

companySchema.plugin(mongooseAutopopulate)
module.exports = mongoose.model('Company', companySchema)