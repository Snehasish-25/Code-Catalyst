 const Course=require("../models/course");
 const searchCourse = async (req,res) => {
    try {
        const {query = "",categories=[], sortByPrice =""} = req.query;
        // console.log(req.query);
        // console.log(categories);

        // create search query
        const searchCriteria = {
            isPublished:true,
            $or:[
                {title: {$regex:query, $options:"i"}},
                {subTitle: {$regex:query, $options:"i"}},
                {category: {$regex:query, $options:"i"}},
            ]
        }

        // if categories selected
        if(categories.length > 0) {
            searchCriteria.category = {$in: categories};
        }

        // define sorting order
        const sortOptions = {};
        if(sortByPrice === "low"){
            sortOptions.coursePrice = 1;//sort by price in ascending
        }else if(sortByPrice === "high"){
            sortOptions.coursePrice = -1; // descending
        }

        //console.log(searchCriteria);
        let courses = await Course.find(searchCriteria).populate({path:"creator", select:"name photoURL"}).sort(sortOptions);
       // console.log(courses);

        return res.status(200).json({
            success:true,
            courses: courses || [],
            message:"Courses found successfully",
            err:{}
        });

    } catch (error) {
        console.log(
            "Something went wrong in SearchCourse-Controller:",error.message);
          return res.status(500).json({
            status: false,
            data: {},
            message: "Unable to perform search successfully",
            err: error.message,
          });
        
    }
}
module.exports={
    searchCourse
}