import React,{useEffect} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import hospitalBackground from '../images/medecin-ordinateur.jpg';
const fields = [
  {
    label: "firstName",
    type: "text",
    placeholder: "entrer your first name",
    required: true,
    gridCols: 1,
  },
  {
    label: "lastName",
    type: "text",
    placeholder: "entrer your last name",
    required: true,
    gridCols: 1,
  },
  {
    label: "email",
    type: "email",
    placeholder: "entrer your email",
    required: true,
    gridCols: 2,
  },
  {
    label: "phone",
    type: "tel",
    placeholder: "Entrer your phone unmber",
    required: true,
    gridCols: 1,
  },
  {
    label: "birthday",
    type: "date",
    placeholder:"choisir votre date de naissance",
    required: true,
    gridCols: 1
  },
  {
    label: "address",
    type: "text",
    placeholder: "Entrer your address",
    required: true,
    gridCols: 2,
  },
  {
    label: "password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
    gridCols: 1,
  },
  {
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    required: true,
    gridCols: 1,
  },
];

export default function Inscription() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      // Envoyer les données d'inscription à l'API
      const response = await axios.post('http://localhost:8082/api/users/patient', data);
      console.log("patient: ",response.data);
      // Vous pouvez traiter la réponse ici, par exemple, rediriger l'utilisateur après l'enregistrement
    } catch (error) {
      // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
      console.error("Inscription failed", error);
    }
  };
  useEffect(() => {
    // Désactiver le défilement lorsque le composant est monté
    document.body.classList.add('overflow-hidden');

    // Réactiver le défilement lorsque le composant est démonté
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  return (
    <div 
    style={{
      backgroundImage: `url(${hospitalBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
     
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="container mx-auto">
        <div className="lg:w-6/12 pb-8 pt-4 w-full p-2  sm:p-4 flex flex-wrap justify-center shadow-md bg-white bg-opacity-50 mt-20 my-10 mx-auto rounded-md">
          <div className="pb-5">
            <h1 className="text-3xl font-bold">Register Form</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-start items-center w-full m-auto"
          >
            <div className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-3 w-full">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className={`text-left flex flex-col gap-2 w-full ${
                    field.gridCols === 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <label className="font-semibold">{field.label}</label>
                  <input
                    {...register(field.label, {
                      required: field.required,
                    })}
                    className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500 ${
                      field.gridCols === 2 ? "md:w-full" : ""
                    }`}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                  {errors[field.label.toLowerCase()] && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full text-left">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-red-500 text-white text-md font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
                title="Confirm Order"
              >
                <span>Register</span>
                <HiOutlineArrowCircleRight size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}