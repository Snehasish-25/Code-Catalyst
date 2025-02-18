const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const cookieParser=require("cookie-parser");

const apiRoutes=require("./routes/index");
const {PORT}=require("./config/serverConfig");
const connect=require("./config/database")
const app=express();

//console.log(apiRoutes);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api",apiRoutes);

app.listen(PORT,async()=>{
    console.log(`Server started successfuly on port ${PORT}`);
    await connect();
});