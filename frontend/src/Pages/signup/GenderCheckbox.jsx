// GenderCheckbox.jsx
const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
      <div className="my-4">
          <label className="text-base label-text">Gender</label>
          <div className="flex space-x-4">
              <label>
                  <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={selectedGender === "male"}
                      onChange={() => onCheckboxChange("male")}
                  />
                  Male
              </label>
              <label>
                  <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={selectedGender === "female"}
                      onChange={() => onCheckboxChange("female")}
                  />
                  Female
              </label>
          </div>
      </div>
  );
};

export default GenderCheckbox;
