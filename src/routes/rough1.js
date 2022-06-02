 
 
 // -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7] : 4 is missing
 // Your route code will look like this
 app.get("/sol1", function (req, res) {
    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr= [1,2,3,5,6,7]
    let missingNumber = (n*n+1)/2 - sum
    let sum = 0
    for(i=0;i<arr.length;i++){
        sum = sum + i
    }
    console.log("missing " + missingNumber );

    ///LOGIC WILL GO HERE 
    res.send(  { data: missingNumber  }  );
});

