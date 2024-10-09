const length = ["","Kilometres","Metres","Inches","Centimetres"]
const weight = ["","Kilograms","Grams","Pound","Miligrams"]
const volume = ["","Cubic meter","Cubic cm","Litre","Millilitre"]
const temperature = ["","Celsius","Farenheit","Kelvin"]

function helper(array,source,target){
    array.forEach( (x,index)=>{
        let created1 = document.createElement('option');
        created1.innerHTML = created1.value = x;

        let created2 = document.createElement('option');
        created2.innerHTML = created2.value = x;

        source.append(created1);
        target.append(created2);

         if (index === 0) {
         created1.className = 'hide';
         created2.className = 'hide';
     }

        
     } )
}
function display(){
   let category = document.querySelector('#categories');
   let selected_option = category.value;

   let source = document.querySelector('#src_unit');
    let target = document.querySelector('#target_unit');
    
    // Clear previous options
    source.innerHTML = '';
    target.innerHTML = '';

   if(selected_option==="Length"){
     helper(length,source,target);
   }
   else if(selected_option==="Weight"){
    helper(weight,source,target);
   }
   else if(selected_option==="Volume"){
    helper(volume,source,target);
   }
   else if(selected_option==="Temperature"){
    helper(temperature,source,target);
   }

   

}

function convertlength(val,src_unit,target_unit){
   let ans_box = document.querySelector('#answer');
   if(val<0){
      ans_box.innerHTML= "Invalid Input";
      return;
   }

   const conversion_factor = {
      "Kilometres": 0.001,
      "Metres": 1,
      "Inches": 39.3701,
      "Centimetres": 100
    };

    let in_metre = val/conversion_factor[src_unit];
    let ans = in_metre * conversion_factor[target_unit];
    ans_box.innerHTML= `Answer: ${ans} ${target_unit}`;



}

function convertvolume(val,src_unit,target_unit){
   let ans_box = document.querySelector('#answer');
   if(val<0){
      ans_box.innerHTML= "Invalid Input";
      return;
   }

   const conversion_factor = {
      "Cubic meter":0.001,"Cubic cm":1000,"Litre":1,"Millilitre":1000
    };

    let in_litre = val/conversion_factor[src_unit];
    let ans = in_litre * conversion_factor[target_unit];
    ans_box.innerHTML= `Answer: ${ans} ${target_unit}`;



}

function convertweight(val,src_unit,target_unit){
   let ans_box = document.querySelector('#answer');
   if(val<0){
      ans_box.innerHTML= "Invalid Input";
      return;
   }

   const conversion_factor = {
      "Kilograms":1,"Grams":1000,"Pound":2.205,"Miligrams":1000000
    };

    let in_kg = val/conversion_factor[src_unit];
    let ans = in_kg * conversion_factor[target_unit];
    ans_box.innerHTML= `Answer: ${ans} ${target_unit}`;



}

function converttemp(val, src_unit, target_unit) {

   if(val<0 && src_unit==="Kelvin"){
      ans_box.innerHTML= "Invalid Input";
      return;
   }

   let ans_box = document.querySelector('#answer');
   let ans;
   if (src_unit === "Celsius") {
      if (target_unit === "Fahrenheit") {
         ans = (val * 9/5) + 32;
      } else if (target_unit === "Kelvin") {
         ans = val + 273.15;
      } else {
         ans = val;
      }
   } else if (src_unit === "Fahrenheit") {
      if (target_unit === "Celsius") {
         ans = (val - 32) * 5/9;
      } else if (target_unit === "Kelvin") {
         ans = (val - 32) * 5/9 + 273.15;
      } else {
         ans = val;
      }
   } else if (src_unit === "Kelvin") {
      if (target_unit === "Celsius") {
         ans = val - 273.15;
      } else if (target_unit === "Fahrenheit") {
         ans = (val - 273.15) * 9/5 + 32;
      } else {
         ans = val;
      }
   } 
   ans_box.innerHTML = `Answer: ${ans} ${target_unit}`;
}




function convert(){
   let source_dropdown = document.querySelector('#src_unit');
   let target_dropdown = document.querySelector('#target_unit');
   let val_input = document.querySelector('#value');

   let src_unit = source_dropdown.value;
   let target_unit = target_dropdown.value;
   let val = parseFloat(val_input.value);
   let category = document.querySelector('#categories').value;

   if(category==="Length") convertlength(val,src_unit,target_unit);
   else if(category==="Volume") convertvolume(val,src_unit,target_unit);
   else if(category==="Weight") convertweight(val,src_unit,target_unit);
   else if (category==="Temperature") converttemp(val,src_unit,target_unit);

}

document.addEventListener('DOMContentLoaded',()=>{
   let btn = document.querySelector('#convert');
   btn.addEventListener('click',convert);

   let c = document.querySelector('#categories');
   c.addEventListener('change',display);

   let r = document.querySelector('#reset');
   r.addEventListener('click',()=>{
      document.querySelector('#answer').innerHTML="";
   })


})