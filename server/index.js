const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const path=require("path");

const apiRoutes=require("./routes/index");
const {PORT}=require("./config/serverConfig");
const connect=require("./config/database")
const app=express();

const _dirname=path.resolve();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:"https://code-catalyst-r4el.onrender.com",
    credentials:true
}));

app.use("/api",apiRoutes);

app.use(express.static(path.join(_dirname,"/client/dist")));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"));
})

app.listen(PORT,async()=>{
    console.log(`Server started successfuly on port ${PORT}`);
    await connect();
});