const supabaseUrl = "https://xuladkirdleczvqlvkzr.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1bGFka2lyZGxlY3p2cWx2a3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2OTA5MDgsImV4cCI6MjEwMDI2NjkwOH0.tqLHurcorsedBgPEoeynwmajCJox4tXMfECkxhxwLiU";

const client = supabase.createClient(supabaseUrl, supabaseKey);

async function searchBearing() {

    const serial = document.getElementById("serial").value.trim();

    if (serial === "") {
        alert("Please Enter Serial Number");
        return;
    }

    const { data, error } = await client
        .from("Bearing_tracebility")
        .select("*")
        .eq("serial_number", serial);

    if (error) {
        document.getElementById("result").innerHTML =
            "<h3 style='color:red'>" + error.message + "</h3>";
        return;
    }

    if (data.length === 0) {
        document.getElementById("result").innerHTML =
            "<h3 style='color:red'>Bearing Not Found</h3>";
        return;
    }

    const b = data[0];

    document.getElementById("result").innerHTML = `
        <h2>Bearing Details</h2>

        <table border="1" cellpadding="10">

            <tr>
                <th>Field</th>
                <th>Value</th>
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

        </table>
    `;
const qrData =
"https://llbi-1.github.io/Bearing_QR_System/?sn=" +
encodeURIComponent(b.serial_number);

QRCode.toCanvas(
    document.getElementById("qrcode"),
    qrData
);
    function (error) {
        if (error) console.error(error);
    }
);
}
