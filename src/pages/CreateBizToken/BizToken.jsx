import { useState } from 'react';
import './BizToken.css';


export default function BizToken() {
    const [formData,setFormData] = useState({
        name: '',
        occupation: '',
        email: '',
        PhoneNum: '',
        socials: '',
        color: '',
        image: ''
    });
    //small head
    const updateChange = (event) =>{                //event = when client updates values in form fields
        const{name, value} = event.target;          //setformdata will update formdata with new updated values
        setFormData({...formData, [name]: value});  // ...userform = spread -> new object, copies old userform
    };                                               // [name]: value -> dynamic update values based on what was inputted in field

    
    const handleSubmission = async (event) => {
        event.preventDefault(); //stop page from reloading after submission
        
        

        console.log(formData);
        setFormData({                                           //reset form
            name: '',
            occupation: '',
            email: '',
            PhoneNum: '',
            socials: '',
            color: '',
            image: ''
        });
    };
    
    return (
      <main>
        
        <form onSubmit={handleSubmission} className="BizToken-form">
            <h2 className="BizToken-header2">Your Information</h2>
            <label className="BizToken-label">
                Name: <input type="text" name="name" value = {formData.name} onChange={updateChange}
                 className="BizToken-input" placeholder='Name...'/>
            </label> <br/>
            <label className="BizToken-label">
                Occupation: <input type="text" name="occupation" value = {formData.occupation} onChange={updateChange}
                 className="BizToken-input" placeholder='Job...'/>
            </label> <br/>
            <label className="BizToken-label">
                Email: <input type="text" name="email" value = {formData.email} onChange={updateChange} className="BizToken-input"
                placeholder='Email...' />
            </label> <br/>
            <label className="BizToken-label">
                Phone Number: <input type="text" name="PhoneNum" value = {formData.PhoneNum} onChange={updateChange} 
                className="BizToken-input" placeholder='Phone Number...'/>
            </label> <br/>
            <label className="BizToken-label">
                Social Media(s): <input type="text" name="socials" value = {formData.socials} onChange={updateChange}
                 className="BizToken-input" placeholder='Social Medias...'/>
            </label> <br/>

            <div>
                <p>Click to add more social media links</p>
            </div>
            <div>
                <h2>Color Scheme & Design</h2>
                <label className="BizToken-label">
                    Color: <input type="text" name="color" value = {formData.color} onChange={updateChange} 
                    className="BizToken-input" placeholder='Color Scheme...'/>
                </label> <br/>
                <label className="BizToken-label">
                    Input Image: <input type="text" name="image" value = {formData.image} onChange={updateChange}
                    className="BizToken-input" placeholder='Quote...'/>
                </label> <br/>
            </div>
            <button type='submit' className='BizToken-Submit'>Submit</button>
        </form>
        
      </main>
    );
  }