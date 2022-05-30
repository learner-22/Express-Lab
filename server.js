//Load and initialise express

const express=require('express')
const app= express()

const PORT=3000

//Importing the controller function
const getData=require('./Controllers/empData')
const empData = getData()

//setup view engine
app.set('view engine', 'ejs') // Which view engine is being used
app.set('views', './Views')// the path where the view exists

const endPoints = [{link : '/', name: 'Home'} ,{link : '/emp', name: 'All Employee Details'}]
//Root route
app.get('/',(req,res)=>{
    
    res.render('home',{
        pageTitle: 'Employee Home', 
        pageHeader: 'Employee Details Home',
        data: empData,
        links : endPoints
    })
   
})

app.get('/emp',(req,res)=>{
    
    res.render('emp',{
        pageTitle: 'Employee Home', 
        pageHeader: 'Employee Details',
        data: empData,
        links : endPoints
    })
   
})
app.get('/emp/:id',(req,res)=>{
    console.log(req.params)
   // res.send( empData[req.params.id - 1])
    res.render('eachEmp',{
        pageTitle: 'Employee', 
        pageHeader: 'Employee Details ',
        data: empData[req.params.id - 1],
        links : endPoints
    })
})
app.get('/emp/name/:username',(req,res)=>{
    console.log(req.params)
     empData.map((emp)=>{
        if(emp.username  == req.params.username){
            console.log(emp.username)
           res.render('eachEmp',{
        pageTitle: 'Employee', 
        pageHeader: 'Employee Details ',
        data: emp,
        links : endPoints })
        }
        
    })
  
})

app.get('/company/:name',(req,res)=>{
    console.log(req.params)
     empData.map((emp)=>{
        if(emp.company.name  == req.params.name){
           
        res.render('eachEmp',{
        pageTitle: 'Employee', 
        pageHeader: 'Employee Details ',
        data: emp,
        links : endPoints })
        }
        
    })
  
})
app.listen(PORT,()=>{
    console.log(`Running Server`)
})