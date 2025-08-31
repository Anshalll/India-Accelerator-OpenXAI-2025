import mongoose from 'mongoose'


export const CreateMongoConnection = async () => {
    const connection = await mongoose.connect(process.env.DB_URI || "DB_URI" , {
        dbName: "aichatbot"
    })
    if (connection) {
        console.log("Database connection established!")
    }
    else{
        console.error("Failed to establish db connection!")
    }


}

