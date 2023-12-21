import React from 'react';
import heartHealthImage from "../images/cardiologieService.jpeg";
import logo from "../images/logoss.PNG"
import imgDoc1 from  "../images/doc1.jpg"
import imgDoc2 from  "../images/doc2.jpg"
import imgDoc3 from  "../images/doc3.jpg"
import imgDoc4 from  "../images/doc4.jpg"
import imgDoc5 from  "../images/doc5.jpg"
import imgDoc6 from  "../images/doc6.jpg"
import Navbar from '../components/home/Navbar';


const ServiceDetails = ({ title, image, description }) => {
  const doctors = [
    {
      img: imgDoc1,
      name: "Dr. Serena Mitchell",
      specialties: "Orthopedic Surgeon",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    },
    {
      img: imgDoc2,
      name: "Dr. Julian Bennett",
      specialties: "Cardiologist",
      testimonial: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid commodi.",
    },
    {
      img: imgDoc3,
      name: "Dr. Camila Rodriguez",
      specialties: "Pediatrician",
      testimonial: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
    },
    {
      img: imgDoc4,
      name: "Dr. Victor Nguyen",
      specialties: "Neurologist",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    },
    {
      img: imgDoc5,
      name: "Dr. Ethan Carter",
      specialties: "Dermatologist",
      testimonial: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid commodi.",
    },
    {
      img: imgDoc6,
      name: "Dr. Olivia Martinez",
      specialties: "Ophthalmologist",
      testimonial: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
    },
  ];

  return (
    <div>
      <Navbar/>
    <div className="max-w-7xl mx-auto  p-8 w-full bg-gray-100 h-screen">
      {/* Titre */}
      

      {/* Image */}
      <img
        src={heartHealthImage}
        alt="Image Principale"
        className="w-full h-auto rounded-lg"
      />
        <h1 className="text-3xl  text-blue-600 font-bold mb-4 mt-2  pt-3">cardiologie</h1>
      {/* Description de service */}
      <div className="flex items-center mb-6   pb-10 pt-10">
        <hr className="border-t-5 border-4 border-solid border-primary  text-blue-600 flex-grow mr-4" />
        <h1 className="text-5xl font-bold text-blue-600">Description</h1>
        <hr className="border-t-5 border-4 border-solid border-primary  text-blue-600 flex-grow mr-4" />
      </div>

      <p className="mt-4  text-xl   text-left text-gray-700">
      Cardiology is a specialized branch of medicine that focuses on the study, diagnosis, and treatment of conditions related to the heart and the cardiovascular system. This exciting field of medicine encompasses a broad range of conditions, from congenital heart diseases to lifestyle-related issues such as coronary artery diseases, hypertension, and rhythm disorders.
Cardiologists, highly skilled and specialized physicians, play a crucial role in preserving cardiovascular health. They employ a combination of advanced clinical skills, state-of-the-art technologies, and innovative diagnostic approaches to assess cardiac function, identify risk factors, and devise personalized treatment plans.
Commonly used diagnostic tests in cardiology include the electrocardiogram (ECG or EKG), echocardiography, nuclear cardiology studies, and cardiac catheterization. These tests help cardiologists evaluate the structure and function of the heart, detect abnormalities, and determine the most effective interventions.
Cardiology also extends into interventional cardiology, where procedures such as angioplasty and stent placement are performed to address blockages in coronary arteries. Additionally, the field encompasses the management of heart failure, heart rhythm abnormalities (arrhythmias), and the prescription of medications to regulate blood pressure and reduce cardiovascular risk.
      </p>
      <div className="flex items-center mb-6   pb-10 pt-10">
        <hr className="border-t-5 border-4 border-solid border-primary  text-blue-600 flex-grow mr-4" />
        <h1 className="text-5xl font-bold text-blue-600">Doctors</h1>
        <hr className="border-t-5 border-4 border-solid border-primary  text-blue-600 flex-grow mr-4" />
      </div>

      {/* Liste de docteurs sous forme de témoignages */}
      <div className="mt-4 grid gap-6 text-center md:grid-cols-3 lg:gap-12">
        {doctors.map((doctor, index) => (
          <div key={index} className="mb-12 md:mb-0">
            <div className="mb-6 flex justify-center">
            <img
  src={doctor.img}
  alt={`Dr. ${doctor.name}`}
  className="w-32 h-32 rounded-full object-cover shadow-lg dark:shadow-black/30"
/>

            </div>
            <h5 className="mb-4 text-xl font-semibold">{doctor.name}</h5>
            <h6 className="mb-4 font-semibold text-primary dark:text-primary-500">
              {doctor.specialties}
            </h6>
            <p className="mb-4">{doctor.testimonial}
            <ul class="mb-0 flex items-center justify-center">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5 text-yellow">
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clip-rule="evenodd" />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5 text-yellow">
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clip-rule="evenodd" />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5 text-yellow">
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clip-rule="evenodd" />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5 text-yellow">
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clip-rule="evenodd" />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5 text-yellow">
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clip-rule="evenodd" />
          </svg>
        </li>
      </ul></p>
      <div className="flex justify-center space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Show Profile
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  Appointment
                </button>
              </div>
          </div>
        ))}
      </div>
    </div>
    
 
    </div>
    

  );
};

export default ServiceDetails;
