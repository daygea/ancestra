document.getElementById("year").textContent = new Date().getFullYear();

    // Encrypt data using AES
function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}
// Decrypt data
function decryptData(encryptedData) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
        return null;
    }
}
function isOduPaid(oduName, orientation, specificOrientation, solution, solutionDetails) {
    const storedData = localStorage.getItem("paidOdus");
    if (!storedData) return false;

    const paidOdus = decryptData(storedData);
    if (!paidOdus) return false;

    const combinationKey = `${oduName}-${orientation}-${specificOrientation}-${solution}-${solutionDetails}`;
    const expirationTime = paidOdus[combinationKey];

    return expirationTime && Date.now() < expirationTime;
}
function grantOduAccess(oduName, orientation, specificOrientation, solution, solutionDetails) {
    let paidOdus = decryptData(localStorage.getItem("paidOdus")) || {};
    
    const combinationKey = `${oduName}-${orientation}-${specificOrientation}-${solution}-${solutionDetails}`;
    paidOdus[combinationKey] = Date.now() + 24 * 60 * 60 * 1000; // Set 24-hour expiry

  await fetch(`${API_URL}/api/divination/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            oduName: mainCast,
            orientation,
            specificOrientation,
            solution,
            solutionDetails,
            paid: true
        })
    });


    localStorage.setItem("paidOdus", encryptData(paidOdus));
}
function payForOdu(oduName, orientation, specificOrientation, solution, solutionDetails) {
    let handler = PaystackPop.setup({
        key: "pk_live_b39b445fba8a155f04a04980705a3c10ae85d673",
        email: "info@aokfoundation.org",
        amount: 100000, // ₦1000 (amount is in kobo)
        currency: "NGN",
        callback: function(response) {
            alert("Donation made successfully, Thank you! Ref: " + response.reference);
            grantOduAccess(oduName, orientation, specificOrientation, solution, solutionDetails);
            performUserDivination();
        },
        onClose: function() {
            alert("Payment cancelled.");
        }
    });
    handler.openIframe();
}

// Check if the Odu is locked (premium)
async function revealOduMeaning(oduName, orientation, specificOrientation, solution, solutionDetails) {
    const hasAccess = await isOduPaid(oduName, orientation, specificOrientation, solution, solutionDetails);

    if (hasAccess) {
        // If Odu is paid, fetch Odu data and proceed with divination
        // const oduInfo = await fetch(`http://localhost:3000/api/odu/${oduName}`);
        const oduInfo = await fetch(`${API_URL}/api/odu/${oduName}`);
        const data = await oduInfo.json();
        performUserDivination(data);  // Proceed with divination
    } else {
        // If Odu is locked, show payment modal
        showPaymentModal(oduName, orientation, specificOrientation, solution, solutionDetails);
    }
}

// Base Odùs
const baseOdus = {
    "Ejiogbe": ["|", "|", "|", "|"],
    "Oyeku Meji": ["||", "||", "||", "||"],
    "Iwori Meji": ["||", "|", "|", "||"],
    "Idi Meji": ["|", "||", "||", "|"],
    "Irosun Meji": ["|", "|", "||", "||"],
    "Owonrin Meji": ["||", "||", "|", "|"],
    "Obara Meji": ["|", "||", "||", "||"],
    "Okanran Meji": ["||", "||", "||", "|"],
    "Ogunda Meji": ["|", "|", "|", "||"],
    "Osa Meji": ["||", "|", "|", "|"],
    "Ika Meji": ["||", "|", "||", "||"],
    "Oturupon Meji": ["||", "||", "|", "||"],
    "Otura Meji": ["|", "||", "|", "|"],
    "Irete Meji": ["|", "|", "||", "|"],
    "Ose Meji": ["|", "||", "|", "||"],
    "Ofun Meji": ["||", "|", "||", "|"]
};
// Image paths for mapping
const imageMap = {
    "|": "public/img/openOpele-before.png",
    "||": "public/img/closeOpele-before.png"
};

// Function to convert a symbol array into image elements
const getOduImages = (symbols) => {
    return symbols.map(symbol => 
        `<img src="${imageMap[symbol]}" alt="${symbol}" class="odu-line">`
    ).join("");
};
// Generate all 256 Odù combinations
const generateOduCombinations = () => {
    const baseOduNames = Object.keys(baseOdus);
    const allOdus = [...baseOduNames];
    baseOduNames.forEach(firstOdu => {
        baseOduNames.forEach(secondOdu => {
            if (firstOdu !== secondOdu) {
                let firstName = firstOdu === "Ejiogbe" ? "Ogbe" : firstOdu.split(" ")[0];
                let secondName = secondOdu === "Ejiogbe" ? "Ogbe" : secondOdu.split(" ")[0];
                allOdus.push(`${firstName} ${secondName}`);
            }
        });
    });
    return allOdus;
};
const allOdus = generateOduCombinations();
// Populate dropdowns
const populateDropdown = (dropdown, options) => {
    dropdown.innerHTML = ""; // Clear existing options
    options.forEach(option => {
        const optElement = document.createElement("option");
        optElement.value = option;
        optElement.textContent = option;
        dropdown.appendChild(optElement);
    });
};
const populateDropdowns = () => {
    const mainCastDropdown = document.getElementById("mainCast");
    populateDropdown(mainCastDropdown, allOdus);
    updateSpecificOrientation();
    updateSolutionDetails(); // Populate solution details on page load
};
document.getElementById("mainCast").addEventListener("change", function() {
    const selectedOdu = this.value; // Get the selected Odu Ifa from the dropdown or input
    displayConfiguration(selectedOdu); // Pass it to the function
});
// Check if oduMessages has data for the selected mainCast, fallback if not
const getOduMessageData = async (mainCast, orientation, specificOrientation, solution, specificSolution) => {
    try {
        // const response = await fetch(`http://localhost:3000/api/odu/messages/${encodeURIComponent(mainCast)}/${encodeURIComponent(orientation)}/${encodeURIComponent(specificOrientation)}/${encodeURIComponent(solution)}/${encodeURIComponent(specificSolution)}`);

        const response = await fetch(`${API_URL}/api/odu/messages/${encodeURIComponent(mainCast)}/${encodeURIComponent(orientation)}/${encodeURIComponent(specificOrientation)}/${encodeURIComponent(solution)}/${encodeURIComponent(specificSolution)}`);
        
        if (!response.ok) throw new Error("Failed to fetch Odu message data");

        const oduData = await response.json();

        const messageData = oduData?.Message || "No message available.";
        const solutionData = oduData?.[solution]?.[specificSolution] || "No solution info available.";
        const orientationMessage = oduData?.Messages || "No general message available for this orientation.";
        const specificOrientationMessage = oduData?.[specificOrientation]?.Message || "No message available for this specific orientation.";

        return {
            message: messageData,
            solutionInfo: solutionData,
            orientationMessage: orientationMessage,
            specificOrientationMessage: specificOrientationMessage
        };
    } catch (error) {
        console.error("Error fetching Odu message data:", error);
        return {
            message: "No message available.",
            solutionInfo: "No solution info available.",
            orientationMessage: "No general message available.",
            specificOrientationMessage: "No message available for this specific orientation."
        };
    }
};

const updateSpecificOrientation = async () => {
    const orientation = document.getElementById("orientation").value;
    const dropdown = document.getElementById("specificOrientation");
    const mainCast = document.getElementById("mainCast").value;

    if (!mainCast) {
        const defaultOptions = getDefaultOrientationOptions(orientation);
        populateDropdown(dropdown, defaultOptions);
        return;
    }

    try {
        // const response = await fetch(`http://localhost:3000/api/odu/orientations/${encodeURIComponent(mainCast)}/${encodeURIComponent(orientation)}`);

        const response = await fetch(`${API_URL}/api/odu/orientations/${encodeURIComponent(mainCast)}/${encodeURIComponent(orientation)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const options = data[orientation] || [];
        populateDropdown(dropdown, options.length > 0 ? options : getDefaultOrientationOptions(orientation));
        
    } catch (error) {
        console.error("Orientation fetch error:", error);
        populateDropdown(dropdown, getDefaultOrientationOptions(orientation));
    }
};

// Helper function
function getDefaultOrientationOptions(orientation) {
    return orientation === "Positive"
        ? ["Aiku", "Aje", "Isegun", "Igbale Ese", "Gbogbo Ire"]
        : ["Iku", "Arun", "Ejo", "Ofo", "Okutagbunilese"];
}

const updateSolutionDetails = async () => {
    const solution = document.getElementById("solution").value;
    const dropdown = document.getElementById("solutionDetails");
    const mainCast = document.getElementById("mainCast").value;

    if (!mainCast) {
        const defaultOptions = getDefaultSolutionOptions(solution);
        populateDropdown(dropdown, defaultOptions);
        return;
    }

    try {
        // const response = await fetch(`http://localhost:3000/api/odu/solutionDetails/${encodeURIComponent(mainCast)}/${encodeURIComponent(solution)}`);

        const response = await fetch(`${API_URL}/api/odu/solutionDetails/${encodeURIComponent(mainCast)}/${encodeURIComponent(solution)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const options = data[solution] || [];
        populateDropdown(dropdown, options.length > 0 ? options : getDefaultSolutionOptions(solution));
        
    } catch (error) {
        console.error("Solution details fetch error:", error);
        populateDropdown(dropdown, getDefaultSolutionOptions(solution));
    }
};

// Helper function
function getDefaultSolutionOptions(solution) {
    return solution === "Ebo"
        ? ["Akoru", "Esha"]
        : ["Ori", "Osha", "Eegun", "Ifa"];
}



function getOduSummary(mainCast) {
    const cleanedOdu = mainCast.replace("Meji", "").replace("Eji", "").trim();
    const [first, second] = cleanedOdu.split(" ");

    // Helper to find figure meaning
    const findFigure = (name) => {
        return ifaFigures.find(figure => figure.name.toLowerCase() === name.toLowerCase());
    };

    const summaries = [];

    if (second) {
        const firstFig = findFigure(first);
        const secondFig = findFigure(second);
        if (firstFig) summaries.push(`<p><strong>${firstFig.name}</strong>: ${firstFig.meaning}</p>`);
        if (secondFig) summaries.push(`<p><strong>${secondFig.name}</strong>: ${secondFig.meaning}</p>`);
    } else {
        const fig = findFigure(cleanedOdu);
        if (fig) summaries.push(`<p><strong>${fig.name}</strong>: ${fig.meaning}</p>`);
    }

    return summaries.join("");
}

let isAdminAuthenticated = false;
// Tap detection for mobile users
let tapCount = 0;
document.getElementById("hiddenTapArea").addEventListener("click", function() {
    tapCount++;
    if (tapCount === 9) {
        document.getElementById("adminPasswordContainer").style.display = "block";
        tapCount = 0; // Reset tap count
    }
    setTimeout(() => (tapCount = 0), 3000); // Reset if no tap in 3 sec
});
// Detect "Enter" key press in admin password input field
document.getElementById("adminPassword").addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default behavior
        await authenticateAdmin(); // Call the admin authentication function
    }
});
// Admin Login Function
const authenticateAdmin = async () => {
    const adminPasswordInput = document.getElementById("adminPassword").value;
    const hashedInputPassword = await hashPassword(adminPasswordInput);

    if (storedHashedPasswords.includes(hashedInputPassword)) {
        isAdminAuthenticated = true;
        document.getElementById("adminPasswordContainer").style.display = "none";
        document.getElementById("adminLogoutContainer").style.display = "block";

    } else {
        alert("Incorrect password! Please try again.");
    }
};

function printDivinationResult() {
    if (!isAdminAuthenticated) {
        alert("Only admins can print.");
        return;
    }
    const printHeader = document.getElementById("configurationResult").innerHTML;
    const printContent = document.getElementById("divinationResult").innerHTML;

    // Create an iframe
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
        <html>
        <head>
            <title>Print - Ancestra - Be Illuminated...</title>
            <style>
            body{
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            color: green;
            background-color: white;
            background-image: url('../img/background.jpg');
            background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
            font-family: Courier, monospace;
            font-weight: bold;
         }
        .odu-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        /*    width: fit-content;*/
            width: 12%;
            margin: auto;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .odu-header {
            position: absolute;
            top: -25px; /* Adjust this value to move it up/down */
            z-index: 2;
            width: 80px;
        }
        .odu-footer {
            position: absolute;
            bottom: -25px; /* Adjust this value to move it up/down */
            z-index: 2;
            width: 80px;
        }
        .odu-line-container {
            display: flex;
            justify-content: center;
            gap: 22px;
            position: relative;
            z-index: 1;
        }
        .odu-line {
            width: 30px;
            height: 50px;
        }
        @media print {
            body { visibility: visible; }
        }
            </style>
        </head>
        <body>
        <center><a href="/" style="color: green; text-decoration: none;"><img src="public/img/logo.png" style="height:75px" alt="Ancestra Logo"/></a></center>
        <center><p>Mo juba <b>OLODUMARE</b>, Ajagunmale, Awonomaja, Odu Ologbooje, Egan, Gbogbo Eleye, Irinwo Imale, Igba Imale, Okanlenirinwo Imale, Otalelugba Imale, Oduduwa, Gbogbo Oba Alade. Mo juba Gbogbo Ajunilo.</p></center>
            
           <center> ${printHeader} </center> <br/>
            ${printContent}

            <center> Ire o. </center>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500); // Give time to render
}

const performUserDivination = async (
    mainCastParam,
    orientationParam,
    specificOrientationParam,
    solutionParam,
    solutionDetailsParam
) => {
    resetSpeechState();

    // Use provided parameters or fall back to DOM values
    const mainCast = mainCastParam || document.getElementById("mainCast").value;
    const orientation = orientationParam || document.getElementById("orientation").value;
    const specificOrientation = specificOrientationParam || document.getElementById("specificOrientation").value;
    const solution = solutionParam || document.getElementById("solution").value;
    const solutionDetails = solutionDetailsParam || document.getElementById("solutionDetails").value;

    const orientationText = orientation === "Positive" ? "Ire" : "Ayewo";
    const resultElement = document.getElementById("divinationResult");
    resultElement.innerHTML = "<p style='text-align:center'><em>Loading divination details...</em></p>";

    try {
        // const response = await fetch('http://localhost:3000/api/odu/' + encodeURIComponent(mainCast));
        const response = await fetch(`${API_URL}/api/odu/${encodeURIComponent(mainCast)}`);
        if (!response.ok) throw new Error("Failed to fetch Odu data");

        const oduData = await response.json();
        const orientationBlock = oduData?.[orientation];
        const specificOrientationBlock = orientationBlock?.[specificOrientation];

        const message = specificOrientationBlock?.Message || "No message available.";
        const solutionInfo = specificOrientationBlock?.[solution]?.[solutionDetails] || "No solution info available.";

        const aseIfa = oduData.AseIfa || [];
        const orisha = oduData.Orisha;
        const taboo = oduData.Taboo;
        const names = oduData.Names;
        const occupation = oduData.Occupation;
        const credit = oduData.Credit;
        const alias = oduData.alias;
        const audioData = oduData.audioData || [];
        const videoData = oduData.videoData || [];

        const aseIfaHTML = aseIfa.length ? aseIfa.map(item => `<p>${item}</p>`).join("") : "";

        const audioHTML = audioData.length
            ? audioData.map(item =>
                `<p class="col-md-6" style="float:left;"> 
                    <a href="#" onclick="openAudioModal('${item.url}'); return false;">
                        <img src="public/img/player.png" style="height: 20px;" /> Listen to Audio
                    </a> of ${item.author}
                </p>`).join("")
            : "";

        const videoHTML = videoData.length
            ? videoData.map(item =>
                `<p class="col-md-6" style="float:left;"> 
                    <a href="#" onclick="openVideoModal('${item.url}'); return false;">
                        <img src="public/img/player.png" style="height: 20px;" /> Watch Video
                    </a> of ${item.author}
                </p>`).join("")
            : "";

            // Try to log, but continue even if it fails
            try {
              await logDivination(oduData);
            } catch (loggingError) {
              console.warn('Non-critical logging error:', loggingError);
            }
        if (isAdminAuthenticated || freeOdus.includes(mainCast) || isOduPaid(mainCast, orientation, specificOrientation, solution, solutionDetails)) {
        let resultHTML = `
            <h3 style="text-align: center; margin-top:20px; font-weight: bold;">
                ${mainCast}, ${orientationText} (${specificOrientation}), ${solution} ${solutionDetails}
            </h3>
            <p>${message} ${solutionInfo}</p>
        `;

        const figureSummary = getOduSummary(mainCast); // Your existing summary function
        resultHTML += `<hr/><p style="font-weight: bold"><u>Key Points</u></p>${figureSummary}<hr/>`;

        resultHTML += `<p style="font-weight: bold"><u>Ase Ifa</u></p>${aseIfaHTML}<hr/>`;

        if (orisha) resultHTML += `<p style="font-weight: bold"><u>Orisha</u></p>${orisha}<hr>`;
        if (alias) resultHTML += `<p style="font-weight: bold"><u>Alias</u></p> ${alias}<hr>`;
        if (taboo) resultHTML += `<p style="font-weight: bold"><u>Taboo</u></p> ${taboo}<hr>`;
        if (names) resultHTML += `<p style="font-weight: bold"><u>Names</u></p> ${names}<hr>`;
        if (occupation) resultHTML += `<p style="font-weight: bold"><u>Occupation</u></p> ${occupation}<hr>`;
        resultHTML += `${audioHTML} ${videoHTML} <hr style="clear:both;"/>`;

        if (credit) resultHTML += `<p style="font-weight: bold;"><u>Credit</u></p> ${credit}`;

       
        // await fetch("http://localhost:3000/api/divination/log", {

        await fetch(`${API_URL}/api/divination/log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                oduName: mainCast,
                orientation,
                specificOrientation,
                solution,
                solutionDetails
            })
        });


        resultElement.innerHTML = resultHTML;

            } else {
        resultElement.innerHTML = `
            <center>
                <h4 style="padding-top:30px;">
                    Kindly donate N1,000 to the NGO for a 24-hour access to 
                    ${mainCast}, ${orientationText} (${specificOrientation}), ${solution} ${solutionDetails}.
                </h4>
                <br/>
                <button class="btn btn-lg btn-warning" 
                    onclick="payForOdu('${mainCast}', '${orientation}', '${specificOrientation}', '${solution}', '${solutionDetails}')">
                    Donate Now
                </button>
            </center>
        `;
    }

    } catch (error) {
        resultElement.innerHTML = `<p style="text-align: center;" class="alert alert-info">Error loading divination data: ${error.message}</p>`;
    }

    removeControl();
    displayConfiguration(mainCast);
    smoothScrollTo(resultElement.offsetTop, 2000);
};


// Function to display Odù configuration with overlapping images
const displayConfiguration = (oduName) => {
    const configurationElement = document.getElementById("configurationResult");

    let configHTML = `
        <div class="odu-container" id="odu-container">
            <img src="public/img/chain.png" alt="Odu Header" class="odu-header">
    `;

    if (baseOdus[oduName]) {
        // For the first 16 Odùs
        const config = baseOdus[oduName];

        config.forEach(line => {
            configHTML += `
                <div class="odu-line-container">
                    ${getOduImages([line])} ${getOduImages([line])}
                </div>
            `;
        });

    } else {
        // For combinations like "Ogbe Oyeku"
        const parts = oduName.split(" ");
        const firstPart = parts[0] === "Ogbe" ? "Ejiogbe" : `${parts[0]} Meji`;
        const secondPart = parts[1] === "Ogbe" ? "Ejiogbe" : `${parts[1]} Meji`;
        const firstConfig = baseOdus[firstPart];
        const secondConfig = baseOdus[secondPart];

        if (firstConfig && secondConfig) {
            firstConfig.forEach((line, index) => {
                configHTML += `
                    <div class="odu-line-container">
                        ${getOduImages([secondConfig[index]])} ${getOduImages([line])}
                    </div>
                `;
            });
        } else {
            configHTML = `<h2>Odu</h2><p>Configuration not found for ${oduName}.</p>`;
        }
    }

    configHTML += `
            <img src="public/img/opeleFooter.png" alt="Odu Footer" class="odu-footer">
        </div>
    `;

    configurationElement.innerHTML = configHTML;

    // Apply background image dynamically after content is inserted
    setTimeout(() => {
        const oduContainer = document.getElementById("odu-container");
        if (oduContainer) {
            oduContainer.style.backgroundImage = "url('public/img/opon.png')"; // Change path as needed
        }
    }, 100);
};
// Initialize on page load
window.onload = function() {
     setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
    }, 3000); // Adjust time as needed
    generateCircularButtons();
    populateDropdowns();
    speechSynthesis.cancel(); // Stop any ongoing speech
const savedLang = localStorage.getItem("appLang") || "en";
  // setLanguage(savedLang);
};
 // Generate calculator buttons with hidden numbers
let canClick = true;
function generateCircularButtons() {
    if (!canClick) return; // Prevent rapid clicks
    canClick = false;
    setTimeout(() => (canClick = true), 500); // Allow clicking after 500ms

    const calculatorDiv = document.getElementById("calculator");
    if (!calculatorDiv) return;
    calculatorDiv.innerHTML = ""; // Clear existing buttons

    let numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    numbers.sort(() => Math.random() - 0.5); // Shuffle numbers
    let radius = 80;
    let centerX = 100, centerY = 100;

    numbers.forEach((num, index) => {
        const angle = (index * (360 / numbers.length)) * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angle) - 25;
        const y = centerY + radius * Math.sin(angle) - 25;

        const button = document.createElement("button");
        button.textContent = num;
        button.dataset.number = num;
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;

        button.onclick = function () {
            if (!canClick) return;
            this.classList.add("clicked");
            displayMeaning(this.dataset.number, button);
            setTimeout(generateCircularButtons, 1000);
        };

        calculatorDiv.appendChild(button);
    });
}

// Function to display Numerology and Astrological meaning and highlight the selected button
async function displayMeaning(number, selectedButton) {
    resetSpeechState();

    // Get the single-digit numerology number
    const numerologyNumber = number;
    const resultDiv = document.getElementById("result");
    const configurationElement = document.getElementById("configurationResult");
    let configHTML = "";
    resultDiv.style.display = "none";
    const resultElement = document.getElementById("divinationResult");

    try {
        // Fetch the numerology meaning from the backend
        // const response = await fetch(`http://localhost:3000/api/numerology/${numerologyNumber}`);

        const response = await fetch(`${API_URL}/api/numerology/${numerologyNumber}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch numerology meaning');
        }

        const data = await response.json();

        // Display the fetched data in the result section
        resultElement.innerHTML = `
            <h3 style="text-align: center; margin-top:20px; font-weight:bold;">
                Energy ${numerologyNumber} - ${data.label}
            </h3><hr/>
            <p>${data.meaning}</p>
        `;

        // Configuration (image for the background animation)
        configHTML += `<img class="moving-bg" src="public/img/bird.gif" />`;
        configurationElement.innerHTML = configHTML;

        showControls();
        
        // Smooth scroll to the result section
        smoothScrollTo(resultElement.offsetTop, 2000);

    } catch (error) {
        console.error('Error fetching numerology data:', error);
        resultElement.innerHTML = `<p style="text-align: center;" class="alert alert-info">Error loading numerology data: ${error.message}</p>`;
    }
}


// Handle button click to determine the meaning
document.getElementById("determine-btn").onclick = async () => {
    resetSpeechState();

    const fullName = document.getElementById("fullname").value.trim();
    const birthdate = document.getElementById("birthdate").value;

    const resultElement = document.getElementById("divinationResult");
    const resultDiv = document.getElementById("result");
    const configurationElement = document.getElementById("configurationResult");

    resultElement.innerHTML = "";
    resultDiv.innerHTML = "";
    resultDiv.style.display = "none";

    if (!fullName) {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "<span style='color:red; font-size:14px'>Please enter your full name</span>";
        return;
    }

    if (!birthdate) {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "<span style='color:red; font-size:14px'>Select your birth date.</span>";
        return;
    }

    resultElement.innerHTML = "<p style='text-align:center;'><em>Loading your numerology insights...</em></p>";
    configurationElement.innerHTML = `<img class="moving-bg" src="public/img/bird.gif" />`;

    try {
        const response = await fetch(`${API_URL}/api/numerology/` ,{
        // const response = await fetch("http://localhost:3000/api/numerology", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname: fullName, birthdate })
        });

        if (!response.ok) throw new Error("Failed to get numerology insights.");

        const data = await response.json();

        const html = `
            <h3 style="text-align:center; font-weight:bold; margin-top:20px;">Revelation for ${data.fullname}</h3><hr/>
            <p><strong>Destiny - ${data.destiny.label}</strong></p><p>${data.destiny.meaning}</p><hr/>
            <p><strong>Soul Urge  - ${data.soulUrge.label}</strong></p><p>${data.soulUrge.meaning}</p><hr/>
            <p><strong>How the world sees you - ${data.quiescent.label}</strong></p><p>${data.quiescent.meaning}</p><hr/>

            <p><strong>Today's Energy:</strong> ${data.vibrations.day}</p>
            <p><strong>This Week's Energy:</strong> ${data.vibrations.week}</p>
            <p><strong>This Month's Energy:</strong> ${data.vibrations.month}</p>
            <p><strong>This Year’s Energy:</strong> ${data.vibrations.year}</p>
            <p><strong>Lifetime Energy:</strong> ${data.vibrations.lifetime}</p><hr/>
        `;

        const astro = data.astrology;
        const planet = data.planetaryWisdom;

        if (astro) {
            resultElement.innerHTML = html + `
                <h3>🔭 Astrology Insight: ${astro.name} ${astro.symbol}</h3>
                <p><strong>Element:</strong> ${astro.element}</p>
                <p><strong>Ruler:</strong> ${astro.ruler}</p>
                <p><strong>Traits:</strong> ${astro.traits}</p>
                <p><strong>Strengths:</strong> ${astro.strengths}</p>
                <p><strong>Weaknesses:</strong> ${astro.weaknesses}</p>
                <p><strong>Message:</strong> ${astro.message}</p>
                <hr/>
                ${planet ? `
                    <h3>🌌 Planetary Wisdom</h3>
                    <p><strong>Yoruba Name:</strong> ${planet.yorubaName}</p>
                    <p><strong>Influence:</strong> ${planet.currentInfluence}</p>
                    <p><strong>Upcoming:</strong> ${planet.upcomingShift}</p>
                    <p><strong>Itumo:</strong> ${planet.ifaProverb}</p>
                ` : ""}
            `;
        } else {
            resultElement.innerHTML = html + "<p>No astrology data available.</p>";
        }

        showControls();
        smoothScrollTo(resultElement.offsetTop, 2000);

    } catch (error) {
        resultElement.innerHTML = `<p class="alert alert-info" style="text-align:center;">Error loading data: ${error.message}</p>`;
    }
};


// Admin Logout Function
const logoutAdmin = () => {
    isAdminAuthenticated = false;
    document.getElementById("adminPassword").value = "";
    document.getElementById("adminPasswordContainer").style.display = "block";
    document.getElementById("adminLogoutContainer").style.display = "none";
    resetSpeechState();
    location.reload();
};