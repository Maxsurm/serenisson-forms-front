import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { BackBtn } from "../components/BackBtn";

export const AdminPatientsAdd = () => {
    const param = useParams();
    const [patient, setPatient] = useState({});

    const getPatientInfo = () => {
        axios
            .get(API_URL + "/" + param.id)
            .then(({ data }) => {
                setPatient(data);
                setValue("id", data.id);
                setValue("version", data.version);
                setValue("nom", data.nom);
                setValue("prenom", data.prenom);
                setValue("mail", data.mail);
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        getPatientInfo();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({ defaultValue: patient });
    const [message, setMessage] = useState("void");
    const API_URL = "http://localhost:8080/admin/patients";

    const sendPatientInfo = (data) => {
        axios
            .post(API_URL, data)
            .then((response) => {
                setMessage("success");
                if(param.id =="0"){reset()}
            })
            .catch((error) => {
                console.log(error);
                setMessage("error");
            });
    };

    return (
        <>
        <BackBtn />
            {message == "success" && (
                <p className="bg-emerald-200 p-4 text-black text-center font-bold text-3xl mb-10 rounded-xl border-2 border-green-500">
                    Le patient est bien enregistré{" "}
                </p>
            )}

            {message == "void" && (
                <p className="bg-white p-4 text-black text-center font-bold text-3xl mb-10 rounded-xl">
                    { param.id == "0" ? "Veuillez enregistrer le nouveau patient" : "Veuillez modifier le patient"}
                </p>
            )}

            {message == "error" && (
                <p className="bg-red-200 p-4 text-black text-center font-bold text-3xl mb-10 rounded-xl border-2 border-red-500">
                    Les champs nom, prénom sont obligatoires et l'email doit etre unique !
                </p>
            )}

            <div className="flex justify-center">
                <form
                    onSubmit={handleSubmit(sendPatientInfo)}
                    className="bg-green-50 rounded-xl border border-slate-200 w-2/3 p-6"
                >
                    <div className="my-4">
                        <label className="font-bold text-green-900 text-xl" htmlFor="name">
                            Nom
                        </label>
                        <input
                            {...register("nom", { required: true })}
                            id="nom"
                            name="nom"
                            className="p-5 mt-3 w-full rounded-xl border border-slate-200"
                            type="text"
                            placeholder="Tapez le nom du patient ici"
                        />
                        {errors.nom?.type === "required" && (
                            <p className="text-red-500">Le nom est obligatoire</p>
                        )}
                    </div>
                    <div className="my-4">
                        <label
                            className="font-bold text-green-900 text-xl"
                            htmlFor="firstname"
                        >
                            Prénom
                        </label>
                        <input
                            {...register("prenom", { required: true })}
                            id="prenom"
                            name="prenom"
                            className="p-5 mt-3 w-full rounded-xl border border-slate-200"
                            type="text"
                            placeholder="Tapez le prénom du patient ici"
                        />
                        {errors.prenom?.type === "required" && (
                            <p className="text-red-500">Le prénom est obligatoire</p>
                        )}
                    </div>
                    <div className="my-4">
                        <label className="font-bold text-green-900 text-xl" htmlFor="mail">
                            Email
                        </label>
                        <input
                            {...register("mail", { required: true })}
                            id="mail"
                            name="mail"
                            className="p-5 mt-3 w-full rounded-xl border border-slate-200"
                            type="email"
                            placeholder="Tapez l'Email du patient ici "
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-red-500">L'email est obligatoire et doit etre unique</p>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-green-700 rounded-xl text-white font-bold py-3 px-5 text-2xl"
                            type="submit"
                        >
                            Valider
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
