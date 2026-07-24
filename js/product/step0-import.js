// ==========================================================
// IMPORT
// ==========================================================

Step0.import = async function (url) {

    url = ProductUtils.trim(url);

    if (!url) {

        alert("Vui lòng nhập URL.");

        return;

    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/import",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: url
                })
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {

            throw new Error(
                result.message || "Import thất bại."
            );

        }

        window.draftProduct =
            ProductUtils.productToDraft(
                result.product
            );

        document.dispatchEvent(

            new CustomEvent("product:imported", {

                detail: window.draftProduct

            })

        );

        ProductWizard.next();

    }

    catch (err) {

        console.error(err);

        alert(err.message);

    }

};