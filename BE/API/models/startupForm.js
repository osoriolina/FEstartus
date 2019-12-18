const mongoose = require('mongoose')
const mongooseAutopopulate = require('mongoose-autopopulate')

const types = mongoose.Schema.Types;

const startupSchema = new mongoose.Schema({

    _id: types.ObjectId,
    logo: types.String,
    name: {
        type: String,
        require: true
    },
    tagline: String,
    website: String,
    description: String,
    industry: {
        type: String,
        require: true,
        enum: ["Agriculture", "Advertising", "Aviation", "Alternative Energy Production", "Architecture",
                "Automotive", "Attorneys/Law", "Banking", "Broadcasters/Radio/TV", "Chemical & Related",
             "Communication", "Computer Software", "Construction", "Education", "Electronics", "Energy & Natural Resources",
              "Entertainment Industry", "Environment", "Farming", "Food", "Foreign & Defense Policy", "Forestry", 
            "Foundations Philanthropists & Non Profits", "Garbage Collection/Waste Management", "Gas & Oil", "General Contractors", "Graphic Design and Illustrators",
            "Health","Higher Education", "Hotels & Tourism", "Human Rights", "Insurance", "Internet", "Music Production", "Marketing & Communication",
        "Newspaper & Magazine", "Pharmaceutical", "Real State", "Record Companies (Music Industry)", "Restaurants", "Retail",
        "Sports", "Textiles", "Transportation", "TV/Movies/Music"]
    },
    companySize: {
        type: String,
        require: true,
        enum: ["0 to 1 employee", "2 to 10 employees", "11 to 30 employees", "31 +"]
        
    },
    companyType: {
        type: String,
        require: true,
        enum: ["Educational Institution", "Government Agency", "Nonprofit", "Partnership", "Private Held", "Public Company", "Self-Employed", "Sole Propiertorship"]
    },
    yearFounded: {
        type: Date,
        require: true
    }, 
    expertise: [{
        type: String
    }],
    languages: {
        type: String,
        require: true,
        enum: ["English", "Spanish", "Catalan", "German", "Portuguese", "French", "Italian", "Arabic", "Russian", "Other"]
    },
    country: String,
    city: String,
    address: String,
    phone: String,
    email: {
        type: String,
        require: true
    }, 
    user: {
        type: types.ObjectId,
        ref: 'User',
        autopopulate: true
    }
})

startupSchema.plugin(mongooseAutopopulate)
module.exports = mongoose.model('Startup', startupSchema)