document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const resetBtn = document.getElementById("resetBtn");
    const departmentFilter = document.getElementById("departmentFilter");
    const designationFilter = document.getElementById("designationFilter");
    const facultyContainer = document.getElementById("facultyContainer");
    const loading = document.getElementById("loading");

    // Modal Elements
    const facultyModal = document.getElementById("facultyModal");
    const modalBody = document.getElementById("modalBody");
    const closeModal = document.getElementById("closeModal");

    let facultyData = [];

    // Load faculty.json file
    fetch("faculty.json")
        .then((response) => response.json())
        .then((data) => {
            facultyData = data;
            populateDepartments(data);
            displayFaculty(data);
            loading.style.display = "none";
        })
        .catch((error) => {
            console.error("Error loading faculty data:", error);
            facultyContainer.innerHTML = "<p>❌ Failed to load faculty data</p>";
        });

    // Populate department dropdown
    function populateDepartments(data) {
        const departments = [...new Set(data.map((f) => f.department))];
        departments.forEach((dept) => {
            const option = document.createElement("option");
            option.value = dept;
            option.textContent = dept;
            departmentFilter.appendChild(option);
        });
    }

    // Display faculty cards
    function displayFaculty(data) {
        facultyContainer.innerHTML = "";
        if (data.length === 0) {
            facultyContainer.innerHTML = "<p>⚠️ No faculty found</p>";
            return;
        }
        data.forEach((faculty) => {
            const card = document.createElement("div");
            card.classList.add("faculty-card");

            card.innerHTML = `
                <img src="assets/${faculty.image}" alt="${faculty.name}">
                <h3>${faculty.name}</h3>
                <p><b>ID:</b> ${faculty.id}</p>
                <p><b>Department:</b> ${faculty.department}</p>
                <p><b>Designation:</b> ${faculty.designation}</p>
            `;

            // Add click event to open modal with details
            card.addEventListener("click", () => {
                openModal(faculty);
            });

            facultyContainer.appendChild(card);
        });
    }

    // Open modal with faculty details
    function openModal(faculty) {
        modalBody.innerHTML = `
            <h2>${faculty.name}</h2>
            <img src="assets/${faculty.image}" alt="${faculty.name}" style="width:150px;height:150px;border-radius:50%;margin:10px auto;display:block;">
            <p><b>ID:</b> ${faculty.id}</p>
            <p><b>Department:</b> ${faculty.department}</p>
            <p><b>Designation:</b> ${faculty.designation}</p>
            <p><b>Specialization:</b> ${faculty.specialization || "N/A"}</p>
            <p><b>Email:</b> <a href="mailto:${faculty.email}">${faculty.email}</a></p>
            <p><b>Phone:</b> <a href="tel:${faculty.phone}">${faculty.phone}</a></p>
        `;
        facultyModal.style.display = "block";
    }

    // Close modal
    closeModal.addEventListener("click", () => {
        facultyModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === facultyModal) {
            facultyModal.style.display = "none";
        }
    });

    // Apply search & filters
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const dept = departmentFilter.value;
        const designation = designationFilter.value;

        let filtered = facultyData.filter((f) => {
            return (
                (f.id.toString().toLowerCase().includes(searchTerm) ||
                 f.name.toLowerCase().includes(searchTerm) ||
                 f.department.toLowerCase().includes(searchTerm)) &&
                (dept === "" || f.department === dept) &&
                (designation === "" || f.designation === designation)
            );
        });

        displayFaculty(filtered);
    }

    // Search button click
    searchBtn.addEventListener("click", applyFilters);

    // Pressing Enter triggers search
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            applyFilters();
        }
    });

    // Reset filters
    resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        departmentFilter.value = "";
        designationFilter.value = "";
        displayFaculty(facultyData);
    });
});
