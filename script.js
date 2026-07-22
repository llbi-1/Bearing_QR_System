// ================================
// SUPABASE CONFIGURATION
// ================================

const supabaseUrl = "https://xuladkirdleczvqlvkzr.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1bGFka2lyZGxlY3p2cWx2a3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2OTA5MDgsImV4cCI6MjEwMDI2NjkwOH0.tqLHurcorsedBgPEoeynwmajCJox4tXMfECkxhxwLiU";

const client = supabase.createClient(
    supabaseUrl,
    supabaseKey
);

// ================================
// SEARCH USING SERIAL NUMBER
// ================================

async function searchBearing() {

    const serial = document.getElementById("serial").value.trim();

    if (serial === "") {
        alert("Please Enter Serial Number");
        return;
    }

    const { data, error } = await client
        .from("Bearing_tracebility")
        .select("*")
        .eq("serial_number", serial)
        .single();

    if (error) {

        document.getElementById("result").innerHTML =
            "<h2 style='color:red'>Bearing Not Found</h2>";

        return;
    }

    displayBearing(data);
}

// ================================
// LOAD USING QR ID
// ================================

async function loadBearingById(id) {

    const { data, error } = await client
        .from("Bearing_tracebility")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {

        document.getElementById("result").innerHTML =
            "<h2 style='color:red'>Bearing Not Found</h2>";

        return;
    }

    displayBearing(data);
}

// ================================
// DISPLAY DATA
// ================================

function displayBearing(b) {

    document.getElementById("result").innerHTML = `

<h2>Bearing Details</h2>

<table>

<tr>
<th>Field</th>
<th>Value</th>
</tr>

<tr>
<td>ID</td>
<td>${b.id}</td>
</tr>

<tr>
<td>Code</td>
<td>${b.Code}</td>
</tr>

<tr>
<td>Description</td>
<td>${b.description}</td>
</tr>

<tr>
<td>Serial Number</td>
<td>${b.serial_number}</td>
</tr>

<tr>
<td>Part Number</td>
<td>${b.part_number}</td>
</tr>

<tr>
<td>Quantity</td>
<td>${b.Qty}</td>
</tr>

</table>

`;

    // Generate QR using ID

    const qrUrl =
        "https://llbi-1.github.io/Bearing_QR_System/?id=" +
        b.id;

    QRCode.toCanvas(
        document.getElementById("qrcode"),
        qrUrl,
        function (error) {

            if (error)
                console.error(error);

        }
    );

}

// ================================
// AUTO LOAD AFTER QR SCAN
// ================================

window.onload = function () {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (id) {

        // Hide search section
        document.getElementById("searchSection").style.display = "none";

        // Load directly
        loadBearingById(id);

    }

};
