        // Get modal elements
        const modal = document.getElementById('paymentModal');
        const upiModal = document.getElementById('upiModal');
        const closeBtn = document.getElementsByClassName('close')[0];
        const closeUpiBtn = document.getElementsByClassName('close-upi')[0];
        const itemLinks = document.getElementsByClassName('item-link');
        const paymentForm = document.getElementById('paymentForm');
        const cardDetails = document.querySelector('.card-details');
        const paymentOptions = document.getElementsByName('payment');
        const upiOptionBtns = upiModal.querySelectorAll('.upi-option-btn');
        const upiQrSection = upiModal.querySelector('.upi-qr-section');
        const upiIdSection = upiModal.querySelector('.upi-id-section');
        const upiBackBtn = document.getElementById('upiBackBtn');
        const successModal = document.getElementById('successModal');
        const closeSuccessBtn = document.getElementsByClassName('close-success')[0];

        // Show modal when clicking on any item
        Array.from(itemLinks).forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = "block";
            });
        });

        // Close modal when clicking (x)
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
        closeUpiBtn.onclick = function() {
            upiModal.style.display = "none";
        }
        upiBackBtn.onclick = function() {
            upiModal.style.display = "none";
            modal.style.display = "block";
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
            if (event.target == upiModal) {
                upiModal.style.display = "none";
            }
        }

        // Show/hide card details based on payment method
        Array.from(paymentOptions).forEach(option => {
            option.addEventListener('change', function() {
                if (this.value === 'credit' || this.value === 'debit') {
                    cardDetails.style.display = 'block';
                } else {
                    cardDetails.style.display = 'none';
                }
            });
        });

        // Show success modal
        function showSuccessModal() {
            successModal.style.display = 'block';
            setTimeout(() => {
                successModal.style.display = 'none';
            }, 2500);
        }
        closeSuccessBtn.onclick = function() {
            successModal.style.display = 'none';
        }

        // Update form submission handlers
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const selected = Array.from(paymentOptions).find(opt => opt.checked);
            if (selected && selected.value === 'upi') {
                modal.style.display = "none";
                upiModal.style.display = "block";
                return;
            }
            modal.style.display = "none";
            showSuccessModal();
        });
        // UPI modal submit (for UPI ID)
        upiIdSection.querySelector('button.pay-button').onclick = function(e) {
            e.preventDefault();
            upiModal.style.display = 'none';
            showSuccessModal();
        }

        // Handle UPI option buttons
        upiOptionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                upiOptionBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                if (this.dataset.option === 'qr') {
                    upiQrSection.style.display = 'block';
                    upiIdSection.style.display = 'none';
                } else {
                    upiQrSection.style.display = 'none';
                    upiIdSection.style.display = 'block';
                }
            });
        });