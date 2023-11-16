export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {['SHOPPING CART ', '> CHECKOUT DETAILS', '> ORDER COMPLETE'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2  
              text-center 
           ${
             index <= activeStep
               ? '   text-black font-bold cursor-pointer'
               : 'border-gray-200 text-gray-300 transition duration-500 hover:text-black hover:font-bold cursor-pointer'
           }
              
           `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
