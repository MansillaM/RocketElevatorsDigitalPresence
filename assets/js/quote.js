/******************************** QUOTE PAGE**/

/**Selection */

$(document).ready(() => {
    
    /** Hide everything upon arriving on site */ 

    hideAll();

   
   /** Hide, show input depending on radio clicked and reset fields*/

    $('#building-type').change(function () {

        resetFields();

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

    /** Fonctions work on input change */

    $(".quote-input").on("input", function() {
        
        let buildingType = $("#building-type :selected").text();
        
        if (buildingType == 'Residential') {
            calculateResidential();
        } else if (buildingType == 'Commercial') {
            calculateCommercial();
        } else if (buildingType == 'Corporate') {
            calculateCorpHybrid();
        } else if (buildingType == 'Hybrid') {
            calculateCorpHybrid();
        }
    })

    /** Fonctions work on radio click */

    $('input[name="product_line"]').click(function () {
        let buildingType = $("#building-type :selected").text();
        if (buildingType == 'Residential') {
            calculateResidential();
        } else if (buildingType == 'Commercial') {
            calculateCommercial();
        } else if (buildingType == 'Corporate') {
            calculateCorpHybrid();
        } else if (buildingType == 'Hybrid') {
            calculateCorpHybrid();
        }
    })    
});

/** Calculation for Commercial */

function calculateCommercial() {
  
    var elevatorReq = $('input[name="elevator_cages"]').val();
    var productLine = $("input[name='product_line']:checked").val();
    var unitPrice = getPricePerElevator(productLine);
    var installationFeeMultiplier = getInstallationFeeMultiplier(productLine);
    
    // Step 2: implement calculation logic

    let elevatorNeeded = elevatorReq;
    let totalElevatorPrice = unitPrice * elevatorNeeded;
    let installationFees = totalElevatorPrice * installationFeeMultiplier;
    let totalElPrice = totalElevatorPrice + installationFees;
    
    // Step 3: display elevatorRequired as the value of the answer on the HTML /

    if(isNaN(elevatorNeeded)) {
        $('input[name=amount_of_elevators]').val("Loading...");
    } else {
        parseInt($('input[name=amount_of_elevators]').val(elevatorNeeded));
    }

    if(isNaN(unitPrice)) {
        $('input[name=unit_price]').val("Loading...");
    } else {
        parseInt($('input[name=unit_price]').val(unitPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }

    if(isNaN(totalElevatorPrice)) {
        $('input[name=total_price]').val("Loading...");
    } else {
        parseInt($('input[name=total_price]').val(totalElevatorPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }

    if(isNaN(installationFees)) {
        $('input[name=installation_fee]').val("Loading...");
    } else {
        parseInt($('input[name=installation_fee]').val(installationFees.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }

    if(isNaN(totalElPrice)) {
        $('input[name=final-price]').val("Loading...");
    } else {
        parseInt($('input[name=final-price]').val(totalElPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }
}

/** Calculation for Residential */

function calculateResidential() {
  
    var numApp = parseInt($('input[name=number_of_apartment]').val());
    var numFloor = parseInt($('input[name=number_of_floor]').val());
    var productLine = $("input[name='product_line']:checked").val();
    var unitPrice = getPricePerElevator(productLine);
    var installationFeeMultiplier = getInstallationFeeMultiplier(productLine);
    
    // Step 2: implement calculation logic
    
    let elevatorRequired = parseInt(calculateResidentialElevator(numApp, numFloor));
    let totalElevatorPrice = unitPrice * elevatorRequired;
    let installationFees = totalElevatorPrice * installationFeeMultiplier;
    let totalElPrice = totalElevatorPrice * installationFees;
    
    // Step 3: display elevatorRequired as the value of the answer on the HTML /

    if(isNaN(elevatorRequired)) {
        $('input[name=amount_of_elevators]').val("Loading...");
    } else {
        parseInt($('input[name=amount_of_elevators]').val(elevatorRequired));
    }

    if(isNaN(unitPrice)) {
        $('input[name=unit_price]').val("Loading...");
    } else {
        parseInt($('input[name=unit_price]').val(unitPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }

    if(isNaN(totalElevatorPrice)) {
        $('input[name=total_price]').val("Loading...");
    } else {
        parseInt($('input[name=total_price]').val(totalElevatorPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }

    if(isNaN(installationFees)) {
        $('input[name=installation_fee]').val("Loading...");
    } else {
        parseInt($('input[name=installation_fee]').val(installationFees.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }

    if(isNaN(totalElPrice)) {
        $('input[name=final-price]').val("Loading...");
    } else {
        parseInt($('input[name=final-price]').val(totalElPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }
}

/** Calculation for Corporate and Hybrid */

function calculateCorpHybrid() {
  
    var numOccFloor = parseInt($('input[name=occupants_per_floor]').val());
    var numBase = parseInt($('input[name=number_of_basement]').val());
    var numFloor = parseInt($('input[name=number_of_floor]').val());
    var productLine = $("input[name='product_line']:checked").val();
    var unitPrice = getPricePerElevator(productLine);
    var installationFeeMultiplier = getInstallationFeeMultiplier(productLine);
    
    // Step 2: implement calculation logic
    
    let elevatorNeeded = parseInt(calculateCorporateHybridElevator(numOccFloor, numBase, numFloor));
    let totalElevatorPrice = unitPrice * elevatorNeeded;
    let installationFees = totalElevatorPrice * installationFeeMultiplier;
    let totalElPrice = totalElevatorPrice * installationFees;
    
    // Step 3: display elevatorRequired as the value of the answer on the HTML /

    if(isNaN(elevatorNeeded)) {
        $('input[name=amount_of_elevators]').val("Loading...");
    } else {
        parseInt($('input[name=amount_of_elevators]').val(elevatorNeeded));
    }

    if(isNaN(unitPrice)) {
        $('input[name=unit_price]').val("Loading...");
    } else {
        parseInt($('input[name=unit_price]').val(unitPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }

    if(isNaN(totalElevatorPrice)) {
        $('input[name=total_price]').val("Loading...");
    } else {
        parseInt($('input[name=total_price]').val(totalElevatorPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }

    if(isNaN(installationFees)) {
        $('input[name=installation_fee]').val("Loading...");
    } else {
        parseInt($('input[name=installation_fee]').val(installationFees.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }

    if(isNaN(totalElPrice)) {
        $('input[name=final-price]').val("Loading...");
    } else {
        parseInt($('input[name=final-price]').val(totalElPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})));
    }
}


/** Hide every questions and input */

function hideAll() {

    $('.residential').hide();
    $('.commercial').hide();
    $('.corporate').hide();
    $('.hybrid').hide();
    $('.radios').hide();
    $('.answer').hide();
}

/** Only show residential questions, input and answers */

function residentialSHOW() {

    hideAll();

    $('.residential').show();
    $('.radios').show();
    $('.answer').show();
}

/** Only show commercial questions, input and answers */

function commercialSHOW() {

    hideAll();

    $('.commercial').show();
    $('.radios').show();
    $('.answer').show();
}
 
/** Only show corporate questions, input and answers */

function corporateSHOW() {

    hideAll();

    $('.corporate').show();
    $('.radios').show();
    $('.answer').show();
}

/** Only show hybrid questions, input and answers */

function hybridSHOW() {

    hideAll();

    $('.hybrid').show();
    $('.radios').show();
    $('.answer').show();
}

/** Reset every field upon switching from the dropdownmenu */

function resetFields() {

    $('input[name="number_of_apartment"]').val('');
    $('input[name="number_of_floor"]').val('');
    $('input[name="number_of_basement"]').val('');
    $('input[name="distinct_buisnesses"]').val('');
    $('input[name="number_of_parking"]').val('');
    $('input[name="elevator_cages"]').val('');
    $('input[name="tenant_companies"]').val('');
    $('input[name="occupants_per_floor"]').val('');
    $('input[name="activity"]').val('');
    $('input[name="product_line"]').prop('checked', false);
    $('input[name="amount_of_elevators"]').val('');
    $('input[name="unit_price"]').val('');
    $('input[name="total_price"]').val('');
    $('input[name="installation_fee"]').val('');
    $('input[name="final-price"]').val('');


}

/** Calculation for # of elevator needed for Residential from values */

function calculateResidentialElevator(numApp, numFloor) {
 
    let numberOfAppPerFloor = parseFloat(Math.ceil(numApp / numFloor));
    let numberOfElevatorReq = Math.ceil(numberOfAppPerFloor / 6);
    let numberOfColumn = parseFloat(Math.ceil(numFloor / 20));
    numberOfElevator = numberOfColumn * numberOfElevatorReq //
    return numberOfElevator

}

/** Calculation for # of elevator needed for Corporate/Hybrid from values */

function calculateCorporateHybridElevator(numOccFloor, numBase, numFloor) {

    let totalNumOcc = Math.floor((numFloor + numBase) * numOccFloor);
    let numElevatorReq = Math.floor(totalNumOcc / 1000);
    let numElevatorColumn = Math.ceil((numFloor + numBase) / 20);
    let numElevatorPerColumn = Math.ceil(numElevatorReq / numElevatorColumn);
    let totalNumOfElevator = Math.ceil(numElevatorPerColumn * numElevatorColumn);

    return totalNumOfElevator


}

/** Get installation fee multiplier */

function getInstallationFeeMultiplier(productLine) {

    if (productLine == "Standard") {
        return 0.1;
    } else if (productLine == "Premium") {
        return 0.13;
    } else if (productLine = "Excelium") {
        return 0.16;
    }
}

/** Elevator unit price from existing value  */

function getPricePerElevator(productLine) {

    if (productLine == "Standard") {
        return 7565;
    } else if (productLine == "Premium") {
        return 12345;
    } else if (productLine = "Excelium") {
        return 15400;
    }    
}

