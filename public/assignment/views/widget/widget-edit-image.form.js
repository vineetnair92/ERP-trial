function submitForm(form, event) {

    event.preventDefault();


    console.log($("#imagefile-input").val());
    if($("#imagefile-input").val() != '') {
        $("#imageEditForm")
            .attr("action", "/api/upload");
        form.submit();
    }
    else {
        console.info("Nothing to upload!!")
    }
}

