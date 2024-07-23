import React, { useState } from "react";
import { Button, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { COLORS } from "./colors";

const PaystackPayment = ({ requests, totalAmount, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true); // Set loading to true on button click
    try {
      const formDataArray = requests.map((req) => {
        const formData = new FormData();
        formData.append("name", req.name);
        formData.append("passport", req.passport);
        formData.append("email", req.email);
        formData.append("phoneNumber", req.phoneNumber);
        formData.append("houseNumber", req.houseNumber);
        formData.append("street", req.street);
        formData.append("totalAmount", req.totalAmount);
        return formData;
      });

      const paymentRequests = formDataArray.map((formData) =>
        axios.post(
          "https://backend.myestate.ng/api/v1/card/request",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
      );

      const responses = await Promise.all(paymentRequests);

      const { data } = responses[0]; // Assume all responses have the same structure

      const { authorization_url, reference } = data.result.data.payment;

      // Verify the totalAmount value
      console.log("Total Amount (in kobo):", totalAmount * 100);

      const handler = window.PaystackPop.setup({
        key: "pk_live_154cdde00eeb226bac92b9267598413bee766dcc", // Replace with your Paystack public key
        // key: "pk_test_664bdbe1d71f09f11a4beba7f61ed26df6f16e60", // Replace with your Paystack public key
        email: formDataArray[0].get("email"),
        amount: totalAmount * 100, // Amount in kobo
        currency: "NGN",
        ref: reference,
        callback: function (response) {
          onSuccess(response);
        },
        onClose: function () {
          alert("Payment cancelled");
        },
      });

      handler.openIframe();
    } catch (error) {
      // alert(error?.response?.message);
      console.log("Show Payment Error:", error.response.data.result.message);

      // Extract and display error messages from the API response
      const errorMessages =
        error?.response?.data?.result?.message ||
        "Something went wrong, recheck and try again";

      alert(errorMessages);
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <Button
      mb={"100px"}
      bg={COLORS.green}
      color={"white"}
      w={"200px"}
      size={"lg"}
      _hover={{ backgroundColor: `${COLORS.green}` }}
      onClick={handlePayment}
      disabled={isLoading} // Disable button when loading
    >
      {isLoading ? <Spinner size="sm" color="white" mr={2} /> : "Pay Now"}
    </Button>
  );
};

export default PaystackPayment;
