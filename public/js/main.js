document.getElementById("year").textContent = new Date().getFullYear();

let freeOdus = [];

const preloader = document.getElementById('preloader');

const fetchFreeOdus = async () => {
  // Ensure SERVER_URL is initialized (from your server detection code)
  if (!SERVER_URL) {
    console.error("SERVER_URL is not initialized yet");
    return;
  }

  const url = `${SERVER_URL}/api/config/free-odus`;

  try {
    const response = await fetch(url, {
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    
    // Validate response structure
    if (data && Array.isArray(data.freeOdus)) {
      freeOdus = data.freeOdus; // Set the global variable
     
      return freeOdus;
    } else {
      throw new Error("Invalid response format - expected { freeOdus: [...] }");
    }
  } catch (error) {
    console.error("Failed to fetch freeOdus:", error);
    // You might want to set a default value here if the fetch fails

    freeOdus = ["Ejiogbe"];
    return freeOdus;
  }
};


(async () => {
  
  while (!SERVER_URL) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  await fetchFreeOdus();
  
})();

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

   fetch(`${SERVER_URL}/api/divination/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            oduName: oduName,
            orientation,
            specificOrientation,
            solution,
            solutionDetails,
            paid: true
        })
    });

    localStorage.setItem("paidOdus", encryptData(paidOdus));
}

async function payForOdu(oduName, orientation, specificOrientation, solution, solutionDetails) {
  // Show loading state
  const payButton = document.getElementById('payButton');
  if (payButton) {
    payButton.disabled = true;
    payButton.textContent = 'Processing...';
  }

  try {
    // 1. Get Paystack key
    const keyResponse = await fetch(`${SERVER_URL}/api/paystack-key`);
    
    if (!keyResponse.ok) {
      throw new Error('Failed to get Paystack key');
    }
    
    const { key } = await keyResponse.json();

    // 2. Initialize payment
    const handler = PaystackPop.setup({
      key: key,
      email: "info@aokfoundation.org",
      amount: 100000, // ₦1000 in kobo
      currency: "NGN",
      metadata: { 
        oduName, orientation, specificOrientation, solution, solutionDetails 
      },
       callback: function handlePaymentCallback(response) {  // Proper function declaration
        // Verify payment on backend
        verifyPayment(response.reference)
          .then(verification => {
            if (verification.success) {
              grantOduAccess(oduName, orientation, specificOrientation, solution, solutionDetails);
              performUserDivination();
              alert("Payment successful! Thank you for the donation.");
            } else {
              alert("Payment verification pending. Your access will be granted shortly.");
            }
          })
          .catch(error => {
            console.error("Verification error:", error);
            alert("Payment received! Verification may take a moment.");
          });
      },
      onClose: function handlePaymentClose() {  // Proper function declaration
        if (payButton) {
          payButton.disabled = false;
          payButton.textContent = 'Donate Now';
        }
       
      }
    });

    handler.openIframe();

  } catch (error) {
    console.error("Payment initialization error:", error);
    alert("Payment failed to start. Please try again.");
    if (payButton) {
      payButton.disabled = false;
      payButton.textContent = 'Donate Now';
    }
  }
}

// Payment verification function
async function verifyPayment(reference) {
  try {
    const response = await fetch(`${SERVER_URL}/api/payment/verify/${reference}`);
    return await response.json();
  } catch (error) {
    console.error("Verification failed:", error);
    return { success: false };
  }
}

async function revealOduMeaning(oduName, orientation, specificOrientation, solution, solutionDetails) {
    const hasAccess = await isOduPaid(oduName, orientation, specificOrientation, solution, solutionDetails);

    if (hasAccess) {
        // If Odu is paid, fetch Odu data and proceed with divination
        const oduInfo = await fetch(`${SERVER_URL}/api/odu/${oduName}`);
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
    "|": "public/img/openOpele.png",
    "||": "public/img/closeOpele.png"
};

// Function to convert a symbol array into image elements
const getOduImages = (symbols) => {
    return symbols.map(symbol => 
        `<img src="${imageMap[symbol]}" alt="${symbol}" class="odu-line">`
    ).join("");
};

// Function to reduce a number to a single-digit numerology number
const getNumerologyNumber = (number) => {
    while (number > 9 && number !== 11 && number !== 22) {
        number = number.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return number;
};

const generateOduCombinations = () => {
    const baseOduNames = Object.keys(baseOdus);
    const allOdus = [];

    // Add 16 base Odùs
    baseOduNames.forEach((odu, index) => {
        allOdus.push({
            id: index + 1,
            name: odu,
            numerology: getNumerologyNumber(index + 1),
            base: true
        });
    });

    let idCounter = baseOduNames.length + 1;

    // Add 240 composite Odùs
    baseOduNames.forEach(firstOdu => {
        baseOduNames.forEach(secondOdu => {
            if (firstOdu !== secondOdu) {
                let firstName = firstOdu === "Ejiogbe" ? "Ogbe" : firstOdu.split(" ")[0];
                let secondName = secondOdu === "Ejiogbe" ? "Ogbe" : secondOdu.split(" ")[0];
                let combinedName = `${firstName} ${secondName}`;
                allOdus.push({
                    id: idCounter,
                    name: combinedName,
                    numerology: getNumerologyNumber(idCounter),
                    base: false
                });
                idCounter++;
            }
        });
    });

    return allOdus; // Now it's a proper array of Odù objects
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

const populateDropdowns = async () => {
    try {
        
        const mainCastDropdown = document.getElementById("mainCast");
        
        // First populate main cast dropdown
        // populateDropdown(mainCastDropdown, allOdus);

        populateDropdown(mainCastDropdown, allOdus.map(odu => odu.name));
        
        // Then populate dependent dropdowns sequentially
        await updateSpecificOrientation();
        await updateSolutionDetails();
        
    } catch (error) {
        console.error("Error initializing dropdowns:", error);

        alert("Failed to load dropdown data. Please refresh the page.");
    }
};

// Modify your event listeners to ensure dropdowns are ready
document.getElementById("orientation").addEventListener("change", async function() {
    await updateSpecificOrientation();
});

document.getElementById("solution").addEventListener("change", async function() {
    await updateSolutionDetails();
});

document.getElementById("mainCast").addEventListener("change", async function() {
    const selectedOdu = this.value;
    await updateSpecificOrientation();
    await updateSolutionDetails();
    displayConfiguration(selectedOdu);
});

// Check if oduMessages has data for the selected mainCast, fallback if not
const getOduMessageData = async (mainCast, orientation, specificOrientation, solution, specificSolution) => {
    try {

        const response = await fetch(`${SERVER_URL}/api/odu/messages/${encodeURIComponent(mainCast)}/${encodeURIComponent(orientation)}/${encodeURIComponent(specificOrientation)}/${encodeURIComponent(solution)}/${encodeURIComponent(specificSolution)}`);
        
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

        const response = await fetch(`${SERVER_URL}/api/odu/orientations/${encodeURIComponent(mainCast)}/${encodeURIComponent(orientation)}`);
        
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

        const response = await fetch(`${SERVER_URL}/api/odu/solutionDetails/${encodeURIComponent(mainCast)}/${encodeURIComponent(solution)}`);
        
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

const getInputValue = (id, fallback) =>
    fallback || document.getElementById(id)?.value || '';

const generateMediaLinks = (data, type, openFunc, emoji, label) => {
    if (!Array.isArray(data) || data.length === 0) return '';
    return data.map(item => {
        const safeUrl = item.url.replace(/'/g, "\\'");
        return `<p class="col-md-6" style="float:left;">
                    <a href="#" onclick="${openFunc}('${safeUrl}'); return false;">
                        ${emoji} ${label}
                    </a> of ${item.author}
                </p>`;
    }).join("") + '<br style="clear:both;"/>';
};

const performUserDivination = async (
    mainCastParam,
    orientationParam,
    specificOrientationParam,
    solutionParam,
    solutionDetailsParam
) => {
    resetSpeechState();

    const mainCast = getInputValue("mainCast", mainCastParam);
    const orientation = getInputValue("orientation", orientationParam);
    const specificOrientation = getInputValue("specificOrientation", specificOrientationParam);
    const solution = getInputValue("solution", solutionParam);
    const solutionDetails = getInputValue("solutionDetails", solutionDetailsParam);

    const orientationText = orientation === "Positive" ? "Ire" : "Ayewo";
    const resultElement = document.getElementById("divinationResult");

    preloader.style.display = 'flex';
    preloader.style.justifyContent = 'center';
    preloader.style.alignItems = 'center';

    try {
        const response = await fetch(`${SERVER_URL}/api/odu/${encodeURIComponent(mainCast)}`);
        if (!response.ok) throw new Error("Failed to fetch Odu data");

        const oduData = await response.json();
        const orientationBlock = oduData?.[orientation];
        const specificOrientationBlock = orientationBlock?.[specificOrientation];
        const {
            coreMessage,
            coreAudioData = [],
            coreVideoData = [],
            [solution]: solutionBlock = {}
        } = specificOrientationBlock || {};

        const message = specificOrientationBlock?.Message || "No message available.";
        const solutionInfo = solutionBlock?.[solutionDetails] || "No solution info available.";

        const {
            AseIfa = [],
            Orisha: orisha,
            Taboo: taboo,
            Names: names,
            Occupation: occupation,
            Credit: credit,
            alias,
            audioData = [],
            videoData = []
        } = oduData;

        const aseIfaHTML = AseIfa.map(item => `<p>${item}</p>`).join("");
        const oduSummary = getOduSummary(mainCast);
        const spiritualInsight = decodeIfaWithSpiritualContext(mainCast, orientation, specificOrientation, solution, solutionDetails);

        const coreAudioHTML = generateMediaLinks(coreAudioData, "audio", "openAudioModal", "🎧", "Listen to Audio");
        const coreVideoHTML = generateMediaLinks(coreVideoData, "video", "openVideoModal", "🎥", "Watch Video");
        const audioHTML = generateMediaLinks(audioData, "audio", "openAudioModal", "🎧", "Listen to Audio");
        const videoHTML = generateMediaLinks(videoData, "video", "openVideoModal", "🎥", "Watch Video");

        preloader.style.display = 'none';

        const hasAccess = isAdminAuthenticated || freeOdus.includes(mainCast) ||
            isOduPaid(mainCast, orientation, specificOrientation, solution, solutionDetails);

        if (hasAccess) {
            let resultHTML = `
                <h3 style="text-align: center; margin-top:20px; font-weight: bold;">
                    ${mainCast}, ${orientationText} (${specificOrientation}), ${solution} ${solutionDetails}
                </h3>
                <p>${message} ${solutionInfo}</p>
            `;

            if (oduSummary) resultHTML += `<p style="font-weight: bold"><u>Key Points</u></p>${oduSummary}<hr/>`;
            if (coreMessage) resultHTML += `<p>${coreMessage}</p>`;
            if (coreAudioHTML) resultHTML += coreAudioHTML;
            if (coreVideoHTML) resultHTML += coreVideoHTML;
            if (aseIfaHTML) resultHTML += `<p style="font-weight: bold"><u>Ase Ifa</u></p>${aseIfaHTML}<hr/>`;
            if (orisha) resultHTML += `<p style="font-weight: bold"><u>Orisha</u></p>${orisha}<hr>`;
            if (alias) resultHTML += `<p style="font-weight: bold"><u>Alias</u></p> ${alias}<hr>`;
            if (taboo) resultHTML += `<p style="font-weight: bold"><u>Taboo</u></p> ${taboo}<hr>`;
            if (names) resultHTML += `<p style="font-weight: bold"><u>Names</u></p> ${names}<hr>`;
            if (occupation) resultHTML += `<p style="font-weight: bold"><u>Occupation</u></p> ${occupation}<hr>`;
            if (audioHTML || videoHTML) resultHTML += `${audioHTML} ${videoHTML} <hr/>`;
            resultHTML += `<p style="font-weight: bold"><u>Spiritual Insight</u></p>${spiritualInsight}<hr/>`;
            if (credit) resultHTML += `<p style="font-weight: bold;"><u>Credit</u></p> ${credit}`;

            await fetch(`${SERVER_URL}/api/divination/log`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oduName: mainCast, orientation, specificOrientation, solution, solutionDetails })
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
                    <button id="payButton" class="btn btn-lg btn-warning" 
                        onclick="payForOdu('${mainCast}', '${orientation}', '${specificOrientation}', '${solution}', '${solutionDetails}')">
                        Donate Now
                    </button>
                </center>
            `;
        }

    } catch (error) {
        preloader.style.display = 'none';
        resultElement.innerHTML = `<p style="text-align: center;" class="alert alert-info">Error loading divination data: ${error.message}</p>`;
    }

    removeControl();
    displayConfiguration(mainCast);
    smoothScrollTo(resultElement.offsetTop, 2000);
};


// Function to display Odù configuration with overlapping images
const displayConfiguration = (oduName) => {
    const configurationElement = document.getElementById("configurationResult");

    const odu = allOdus.find(item => item.name === oduName);
    const oduId = odu ? odu.id : "N/A";
    const numerology = odu ? odu.numerology : "N/A";

    let configHTML = `
           <p><strong>No. ${oduId} Odù:</strong> ${oduName}</p>
    `;

     configHTML += `
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

    configHTML += `
        <br/><p><a style="cursor:pointer;" class="btn btn-sm" onclick="displayMeaning(${numerology})">Numerology: ${numerology}</a></p>
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

window.onload = async function () {
    
    try {
        await populateDropdowns(); 
    } catch (err) {
        console.error("Dropdowns failed to populate before preloader timeout.");
    }

    document.getElementById("preloader").style.display = "none"; 

    generateCircularButtons();
    speechSynthesis.cancel(); // Stop any ongoing speech
    // Ensure voices are preloaded
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices(); // This triggers loading
    };
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
            displayMeaning(this.dataset.number);
            setTimeout(generateCircularButtons, 1000);
        };

        calculatorDiv.appendChild(button);
    });
}

// Function to display Numerology and Astrological meaning and highlight the selected button
async function displayMeaning(number) {
    resetSpeechState();
    preloader.style.display = 'flex';
    preloader.style.justifyContent = 'center';
    preloader.style.alignItems = 'center';

    // Get the single-digit numerology number
    const numerologyNumber = number;
    const resultDiv = document.getElementById("result");
    const configurationElement = document.getElementById("configurationResult");
    let configHTML = "";
    resultDiv.style.display = "none";
    const resultElement = document.getElementById("divinationResult");

    try {
        // Fetch the numerology meaning from the backend

        const response = await fetch(`${SERVER_URL}/api/numerology/${numerologyNumber}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch numerology meaning');
        }

        const data = await response.json();
        preloader.style.display = 'none';

        // Display the fetched data in the result section
        resultElement.innerHTML = `
            <h3 style="text-align: center; margin-top:20px; font-weight:bold;">
                Energy ${numerologyNumber} - ${data.label}
            </h3><hr/>
            <p>${data.meaning}</p>

            <p style="font-weight: bold;"><u>Credit</u></p>Shirley Blackwell Lawrence, Najeem Kewunla Kewuyemi (Prof. Kewunla), <a target='_blank' href='https://aokfoundation.org/'>Aminat Olanbiwoninu Kadri (AOK) Foundation</a>
        `;

        // Configuration (image for the background animation)
        configHTML += `<img class="moving-bg" src="public/img/bird.gif" />`;
        configurationElement.innerHTML = configHTML;

        showControls();
        
        // Smooth scroll to the result section
        smoothScrollTo(resultElement.offsetTop, 2000);

    } catch (error) {
        preloader.style.display = 'none';
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
        resultDiv.innerHTML = "<span style='color:red; font-size:14px'>Please select your birth date.</span>";
        return;
    }

    preloader.style.display = 'flex';
    preloader.style.justifyContent = 'center';
    preloader.style.alignItems = 'center';

    // resultElement.innerHTML = "<p style='text-align:center;'><em>Loading your numerology insights...</em></p>";
    configurationElement.innerHTML = `<img class="moving-bg" src="public/img/bird.gif" />`;

    try {
        const response = await fetch(`${SERVER_URL}/api/numerology/` ,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname: fullName, birthdate })
        });

        preloader.style.display = 'none';


        if (!response.ok) throw new Error("Failed to get numerology insights.");

        const data = await response.json();

        const html = `
            <h3 style="text-align:center; font-weight:bold; margin-top:20px;">Revelation for ${data.fullname}</h3><hr/>
            <p style="text-align:center; font-size:22px"><strong>Life Path  - ${data.vibrations.lifepath.label}</strong></p><p>${data.vibrations.lifepath.meaning}</p><hr/>
            <p style="text-align:center; font-size:22px"><strong>Reality (Purpose on Earth) - ${data.vibrations.reality.label}</strong></p><p>${data.vibrations.reality.meaning}</p><hr/>
            <p><strong>Birthday Gift - ${data.birthdayGift.number}</strong> ${data.birthdayGift.meaning}</p><hr/>
            <p><strong>Birthday Challenge/Karma - ${data.birthdayChallenge.number} </strong>${data.birthdayChallenge.meaning}</p><hr/>

            <h3>Summary</h3>
            <p><strong>Life Path - ${data.vibrations.lifepath.number}:</strong> ${data.vibrations.lifepath.label} <a style="cursor:pointer;" class="btn btn-sm" onclick="displayMeaning(${data.vibrations.lifepath.number})">Read more... </a></p>
            <p><strong>Reality (Purpose on Earth) - ${data.vibrations.reality.number}:</strong> ${data.vibrations.reality.label} <a style="cursor:pointer;" class="btn btn-sm" onclick="displayMeaning(${data.vibrations.reality.number})">Read more...</a></p>
            <p><strong>Expression (Destiny) - ${data.destiny.number}:</strong> ${data.destiny.label} <a style="cursor:pointer;" class="btn btn-sm" onclick="displayMeaning(${data.destiny.number})">Read more...</a></p>
            <p><strong>Soul Urge (Heart's desire) - ${data.soulUrge.number}:</strong> ${data.soulUrge.label} <a style="cursor:pointer;" class="btn btn-sm" onclick="displayMeaning(${data.soulUrge.number})">Read more... </a></p>
            <p><strong>Personality (How the world sees you) - ${data.quiescent.number}:</strong> ${data.quiescent.label} <a style="cursor:pointer;" class="btn btn-sm" onclick="displayMeaning(${data.quiescent.number})">Read more... </a></p>
            <p><strong>This Year’s Energy - ${data.vibrations.year.number}:</strong> ${data.vibrations.year.label} <a style="cursor:pointer;" class="btn btn-sm" onclick="displayMeaning(${data.vibrations.year.number})">Read more...</a></p>
            <p><strong>This Month's Energy - ${data.vibrations.month.number}:</strong> ${data.vibrations.month.label} <a style="cursor:pointer;" class="btn btn-sm" onclick="displayMeaning(${data.vibrations.month.number})">Read more...</a></p>
            <p><strong>This Week's Energy - ${data.vibrations.week.number}:</strong> ${data.vibrations.week.label} <a style="cursor:pointer;" class="btn btn-sm" onclick="displayMeaning(${data.vibrations.week.number})">Read more...</a></p>
            <p><strong>Today's Energy - ${data.vibrations.day.number}:</strong> ${data.vibrations.day.label} <a style="cursor:pointer;" class="btn btn-sm" onclick="displayMeaning(${data.vibrations.day.number})">Read more...</a></p>
          
            <hr/>
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
                <h3>Credit</h3>Shirley Blackwell Lawrence, Najeem Kewunla Kewuyemi (Prof. Kewunla), <a target='_blank' href='https://aokfoundation.org/'>Aminat Olanbiwoninu Kadri (AOK) Foundation</a>
            `;
        } else {
            preloader.style.display = 'none';
            resultElement.innerHTML = html + "<p>No astrology data available.</p>";
        }

        showControls();
        smoothScrollTo(resultElement.offsetTop, 2000);

    } catch (error) {
        preloader.style.display = 'none';
        resultElement.innerHTML = `<p class="alert alert-info" style="text-align:center;">Error loading data: ${error.message}</p>`;
    }
};

function decodeIfaWithSpiritualContext(mainCastParam, orientationParam, specificOrientationParam, solutionParam, solutionDetailsParam) {
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

    const elements = ["Fire", "Air", "Water", "Earth"];
    const elementSpiritualData = {
        Fire: {
            orisha: "Sango",
            essence: "Power, Will, Energy, Justice",
            attributes: "Transformation, strength, courage, righteous action",
            imbalance: "Anger, restlessness, impulsive actions",
            focus: "Act with purpose, assert boundaries, align with justice, dance, use fire rituals"
        },
        Air: {
            orisha: "Orunmila",
            essence: "Thought, Breath, Spirit, Intuition",
            attributes: "Wisdom, foresight, clarity of mind, divine communication",
            imbalance: "Confusion, anxiety, mental fog",
            focus: "Meditation, journaling, prayer, quiet study, dream interpretation"
        },
        Water: {
            orisha: "Obatala",
            essence: "Emotion, Compassion, Healing, Purity",
            attributes: "Peace, forgiveness, nurturing, gentleness",
            imbalance: "Emotional blockages, harshness, internal turmoil",
            focus: "Engage in cleansing rituals, show kindness, offer peace, drink water mindfully, take spiritual baths"
        },
        Earth: {
            orisha: "Ogun",
            essence: "Grounding, Labor, Structure, Manifestation",
            attributes: "Hard work, discipline, protection, practicality",
            imbalance: "Laziness, instability, disconnection from purpose",
            focus: "Get hands-on with projects, organize, plant something, work with iron/tools, connect to ancestors"
        }
    };

    const getOduPattern = (oduName) => {
        return baseOdus[oduName] || ["|", "|", "|", "|"];
    };

    const isDoubleOdu = Object.keys(baseOdus).includes(mainCastParam);
    const focusedOdu = isDoubleOdu
        ? mainCastParam.replace(" Meji", "").replace("Eji", "")
        : orientationParam === "Positive"
            ? mainCastParam.split(" ")[1] || mainCastParam.split(" ")[0]
            : mainCastParam.split(" ")[0];

    const pattern = getOduPattern(`${focusedOdu} Meji`);
    const latentOrishaInsights = [];

    const markInterpretation = pattern.map((mark, index) => {
        const element = elements[index];
        const mapping = elementSpiritualData[element];
        const isOpen = mark === "|";
        const energyState = isOpen ? "open (energetically active)" : "closed (energetically latent)";

        if (!isOpen) {
            latentOrishaInsights.push(`
                <strong>${mapping.orisha}</strong> (${element})<br/>
                • Essence: ${mapping.essence}<br/>
                • Attributes: ${mapping.attributes}<br/>
                • Imbalance: ${mapping.imbalance}<br/>
                • Focus: <em>${mapping.focus}</em><br/><br/>
            `);
        }

        return `${index + 1}. Mark ${mark} → Element: <strong>${element}</strong>, Orisha: <strong>${mapping.orisha}</strong> — ${energyState}`;
    });

    const spiritualForce = orientationParam === "Positive"
        ? "Awonomaja"
        : "Ajagunmale";

    const latentSection = latentOrishaInsights.length
        ? `<p><strong>Latent Orisha Energies & Guidance:</strong><br/>${latentOrishaInsights.join("")}</p>`
        : `<p><strong>✅ All Orisha Energies Are Active:</strong> You are fully aligned at this time.</p>`;

    return `
        <p><strong>Odu Focus:</strong> ${focusedOdu}</p>
        <p><strong>Controlling Force:</strong> ${spiritualForce}</p>
        <hr/>
        <p><strong>Line-by-Line Interpretation:</strong></p>
        <ul>${markInterpretation.map(item => `<li>${item}</li>`).join("")}</ul>
        ${latentSection}
    `;
}

// Admin Logout Function
const logoutAdmin = () => {
    isAdminAuthenticated = false;
    document.getElementById("adminPassword").value = "";
    document.getElementById("adminPasswordContainer").style.display = "block";
    document.getElementById("adminLogoutContainer").style.display = "none";
    resetSpeechState();
    location.reload();
};