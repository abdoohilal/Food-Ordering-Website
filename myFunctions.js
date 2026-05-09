
$(document).ready(function () {
    // 1. Show/Hide details based on checkbox
    $('.show-details-btn').change(function () {
        let targetId = $(this).data('target');
        if ($(this).is(':checked')) {
            $('#' + targetId).show();
        } else {
            $('#' + targetId).hide();
        }
    });


    $('#continueBtn').click(function () {
        if ($('.select-meal:checked').length > 0) {
            $('#customerFormContainer').slideDown(500);
            $('html, body').animate({
                scrollTop: $("#customerFormContainer").offset().top
            }, 800);
        } else {
            alert("الرجاء اختيار وجبة واحدة على الأقل قبل المتابعة.");
        }
    });


    $('#submitBtn').click(function () {
        // Collect field values
        let name = $('#fullName').val().trim();
        let nID = $('#nationalId').val().trim();
        let bDate = $('#birthDate').val().trim();
        let phone = $('#mobileNumber').val().trim();
        let email = $('#emailAddress').val().trim();

        // VALIDATION START
        
        // Check if any field is empty (All fields are required)
        if (!name || !nID || !bDate || !phone || !email) {
            alert("خطأ: جميع الحقول مطلوبة، يرجى ملء البيانات كاملة.");
            return;
        }

              let namePattern = /^[\u0621-\u064A\s]+$/;
        if (!namePattern.test(name)) {
            alert("خطأ: يرجى إدخال الاسم بالأحرف العربية فقط.");
            return;
        }


        let nIdPattern = /^[0-9]{11}$/;
        if (!nIdPattern.test(nID)) {
            alert("خطأ: الرقم الوطني يجب أن يتكون من 11 رقم بالضبط.");
            return;
        }

        
        let phonePattern = /^09[3-9]\d{7}$/;
        if (!phonePattern.test(phone)) {
            alert("خطأ: رقم الموبايل غير صحيح (يجب أن يبدأ بـ 09 ويتكون من 10 أرقام).");
            return;
        }

        // Validate Email
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("خطأ: البريد الإلكتروني غير صحيح.");
            return;
        }

        let total = 0;
        let selectedMeals = "";

        $('.select-meal:checked').each(function() {
            total += parseInt($(this).val());
            selectedMeals += "- " + $(this).data('name') + "\n";
        });

        let discount = total * 0.05; // 5% Discount
        let finalPrice = total - discount;

             let message = "تم استلام طلبك بنجاح يا " + name + "!\n\n";
        message += "الوجبات المختارة:\n" + selectedMeals + "\n";
        message += "السعر الإجمالي: " + total + " ل.س\n";
        message += "قيمة الحسم (5%): " + discount + " ل.س\n";
        message += "المبلغ الصافي للدفع: " + finalPrice + " ل.س";

        alert(message);
    });
});
