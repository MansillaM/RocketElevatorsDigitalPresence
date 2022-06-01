/******************************** QUOTE PAGE**/

/**Selection */

$(document).ready(() => {
    hideAll();

   
   
    $('#building-type').change(function () {
        if ($(this).val() == 'empty') {
            hideAll();
        } else if ($(this).val() == 'residential') {
            residentialSHOW();
        } else if ($(this).val() == 'commercial') {
            commercialSHOW();
        } else if ($(this).val() == 'corporate') {
            corporateSHOW();
        } else if ($(this).val() == 'hybrid') {
            hybridSHOW();
        }
    })

    /** Commercial */

    $('input[name="elevator_cages"]').change(function () {
        $('input[name="amount_of_elevators"]').val($(this).val());
    })

    /** Residential */

    $('input[name="number_of_apartment"]').change(function () {
        // Step 1: Get values inputed by user
        // Getting data from HTML to Javascript
        var numApp = parseInt($('input[name=number_of_apartment]').val());
        // console.log(numApp) 
        var numFloor = parseInt($('input[name=number_of_floor]').val()); //
        // console.log(numFloor);

        // Step 2: implement calculation logic
        let elevatorRequired = parseInt(calculateResidentialElevator(numApp, numFloor));
        //console.log(elevatorRequired)
        // Step 3: display elevatorRequired as the value of the answer on the HTML 
        // TODO: how to display data from Javascript to HTML
        parseInt($('input[name=amount_of_elevators]').val(elevatorRequired));
    })

    /** Corporate/Hybrid */

    $('input[name="occupants_per_floor"]').change(function () {
        // Step 1: Get value inputed by user //
        var numOccFloor = parseInt($('input[name=occupants_per_floor]').val());
        //console.log(numOccFloor);
        var numBase = parseInt($('input[name=number_of_basement]').val());
        //console.log(numBase);
        var numFloor = parseInt($('input[name=number_of_floor]').val());
        //console.log(numFloor);

        // Step 2: implement logic //
        let elevatorNeeded = parseInt(calculateCorporateHybridElevator(numOccFloor, numBase, numFloor));
        //console.log(elevatorNeeded)
        // Step 3: display JS to HTML //
        parseInt($('input[name=amount_of_elevators]').val(elevatorNeeded));

    })

    
    /** Installation Fee && Elevator Total Price*/

    $('input[name="product_line"]').click(function () {
        // Step 1: Get value inputed by user //
        let productLine = $("input[name='product_line']:checked").val();

        // Step 2: implement logic //
        let instFee = parseFloat(getInstallationFees(productLine));
        let elevatorPriceTotal = parseFloat(getTotalElevatorPrice(productLine));
        console.log(instFee)
        console.log(elevatorPriceTotal)
        console.log(getTotalElevatorPrice(productLine))

        // Step 3: display JS to HTML //
        $('input[name=installation_fee]').val(instFee.toLocaleString("en-US", {style:"currency", currency:"USD"}));
        $('input[name=total_price]').val(elevatorPriceTotal.toLocaleString("en-US", {style:"currency", currency:"USD"}));
    })

    /** Total Price */

    $('input[name="product_line"]').click(function () {
        // Step 1: Get value inputed by user //
        let productLine = $("input[name='product_line']:checked").val();

        // Step 2: implement logic //
         let totalPrice = parseInt(getTotalPrice(productLine))
        console.log(totalPrice)
        // Step 3: display JS to HTML //
         $('input[name=final-price]').val(totalPrice.toLocaleString("en-US", {style:"currency", currency:"USD"}));
    })

    /** Price Per Elevator*/

    $('input[name="product_line"]').click(function () {
        // Step 1: Get value inputed by user //
        let productLine = $("input[name='product_line']:checked").val();

        // Step 2: implement logic //
         let pricePerElevator = getPricePerElevator(productLine);
        console.log(pricePerElevator)
        
       
        // Step 3: display JS to HTML //
         $('input[name="unit_price"]').val(pricePerElevator.toLocaleString("en-US", {style:"currency", currency:"USD"}));
    })

     
      
        

});

function hideAll() {
    $('.residential').hide();
    $('.commercial').hide();
    $('.corporate').hide();
    $('.hybrid').hide();
    $('.radios').hide();
    $('.answer').hide();
}

function residentialSHOW() {
    hideAll();
    $('.residential').show();
    $('.radios').show();
    $('.answer').show();
}

function commercialSHOW() {
    hideAll();
    $('.commercial').show();
    $('.radios').show();
    $('.answer').show();
}

function corporateSHOW() {
    hideAll();
    $('.corporate').show();
    $('.radios').show();
    $('.answer').show();
}

function hybridSHOW() {
    hideAll();
    $('.hybrid').show();
    $('.radios').show();
    $('.answer').show();
}

function calculateResidentialElevator(numApp, numFloor) {
    // TODO: make sure result is correct
    //($(this).val() = math.floor(numApp / numFloor));

    let numberOfAppPerFloor = parseFloat(Math.ceil(numApp / numFloor));
    let numberOfElevatorReq = Math.ceil(numberOfAppPerFloor / 6);
    let numberOfColumn = parseFloat(Math.ceil(numFloor / 20));
    numberOfElevator = numberOfColumn * numberOfElevatorReq //

    
    //console.log(numberOfAppPerFloor);
    //console.log(numberOfElevatorReq);
    //console.log(numberOfColumn);
    //console.log(numberOfElevator)
    return numberOfElevator

}

function calculateCorporateHybridElevator(numOccFloor, numBase, numFloor) {

    let totalNumOcc = Math.floor((numFloor + numBase) * numOccFloor);
    let numElevatorReq = Math.floor(totalNumOcc / 1000);
    let numElevatorColumn = Math.ceil((numFloor + numBase) / 20);
    let numElevatorPerColumn = Math.ceil(numElevatorReq / numElevatorColumn);
    let totalNumOfElevator = Math.ceil(numElevatorPerColumn * numElevatorColumn);

    //console.log(totalNumOcc);
    //console.log(numElevatorReq); 
    //console.log(numElevatorColumn);
    //console.log(numElevatorPerColumn);
    //console.log(totalNumOfElevator);

    return totalNumOfElevator


}

function getInstallationFees(productLine) {
    let elevatorAmount = $('input[name=amount_of_elevators]').val();

    if (productLine == "Standard") {
        return 7565 * elevatorAmount * .10;
    } else if (productLine == "Premium") {
        return 12345 * elevatorAmount * .13;
    } else if (productLine = "Excelium") {
        return 15400 * elevatorAmount * .16;
    }

    

}

function getTotalElevatorPrice(productLine) {


    let elevatorAmount = parseInt($('input[name=amount_of_elevators]').val());

    if (productLine == "Standard") {
        return 7565 * elevatorAmount;
    } else if (productLine == "Premium") {
        return 12345 * elevatorAmount;
    } else if (productLine = "Excelium") {
        return 15400 * elevatorAmount;
    }

    

}

function getTotalPrice(productLine) {
    
    
    let elevatorAmount = parseInt($('input[name=amount_of_elevators]').val())
    
    
    
    if (productLine == "Standard") {
        return (7565 * elevatorAmount * .10) + (7565 * elevatorAmount);
    } else if (productLine == "Premium") {
        return (12345 * elevatorAmount * .13) + (12345 * elevatorAmount);
    } else if (productLine = "Excelium") {
        return (15400 * elevatorAmount * .16) + (15400 * elevatorAmount);
    }
    
}

function getPricePerElevator(productLine) {
    

    if (productLine == "Standard") {
        return 7565;
    } else if (productLine == "Premium") {
        return 12345;
    } else if (productLine = "Excelium") {
        return 15400;
    }

    
}

