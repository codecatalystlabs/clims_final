import CustomInput from '../../../common/input';

function Edit({ quantity, handleInputChange, setQuantity, setType  }: any) {

 

  return (
    <>
      <form className="grid grid-cols-1 gap-2">
        <CustomInput
          onChange={handleInputChange(setQuantity)}
          value={quantity}
          placeholder="Enter quantity"
          label="Quantity"
          type="number"
          name="quantity"
          defaultValue={undefined}
          act={false}
        />

       

        {/* <div className=" bg-primry mb-[2rem] flex h-full w-full flex-col justify-center space-x-4 px-2">
          <div>
            <p>Stock For:</p>
          </div>
          <div className="flex">
            <div className="flex items-center rounded ps-4">
              <input
                defaultChecked
                id="bordered-radio-2"
                type="radio"
                value=""
                name="bordered-radio"
                className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 focus:ring-2"
                onClick={() => setType(true)}
              />
              <label
                htmlFor="bordered-radio-2"
                className="text-gray-900 dark:text-gray-300 ms-2 w-full py-4 text-sm font-medium"
              >
                Addition
              </label>
            </div>

            <div className=" flex items-center rounded  ps-4">
              <input
                id="bordered-radio-1"
                type="radio"
                value=""
                name="bordered-radio"
                className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 focus:ring-2"
                onClick={() => setType(false)}
              />
              <label
                htmlFor="bordered-radio-1"
                className="text-gray-900 dark:text-gray-300 ms-2 w-full py-4 text-sm font-medium"
              >
                Distribution
              </label>
            </div>
          </div>
        </div> */}
      </form>
    </>
  );
}

export default Edit;
