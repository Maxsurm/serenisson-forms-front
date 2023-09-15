import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { BackBtn } from "../components/BackBtn";

export const AdminQuestionsEdit = () => {
    const param = useParams();
    const [question, setQuestion] = useState({});

    const getQuestionInfo = () => {
        axios
            .get(API_URL + "/" + param.id)
            .then(({ data }) => {
                setQuestion(data);
                setValue("id", data.id);
                setValue("version", data.version);
                setValue("rankOrder", data.rankOrder);
                setValue("question", data.question);
                setValue("type", data.type);
                setValue("formulaire", data.formulaire);
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        getQuestionInfo();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({ defaultValue: question });
    const [message, setMessage] = useState("void");
    const API_URL = "http://localhost:8080/admin/questions";

    const sendQuestionInfo = (data) => {
        axios
            .post(API_URL, data)
            .then((response) => {
                setMessage("success");
                //Reset du formulaire
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
                    La question est bien enregistrée{" "}
                </p>
            )}

            {message == "void" && (
                <p className="bg-white p-4 text-black text-center font-bold text-3xl mb-10 rounded-xl">
                    { param.id == "0" ? "Veuillez enregistrer la nouvelle question" : "Veuillez modifier la question"}
                </p>
            )}

            {message == "error" && (
                <p className="bg-red-200 p-4 text-black text-center font-bold text-3xl mb-10 rounded-xl border-2 border-red-500">
                    Les champs Rang, Question, Type, Formulaire sont obligatoires !
                </p>
            )}

            <div className="flex justify-center">
                <form
                    onSubmit={handleSubmit(sendQuestionInfo)}
                    className="bg-green-50 rounded-xl border border-slate-200 w-2/3 p-6"
                >
                    <div className="my-4">
                        <label className="font-bold text-green-900 text-xl" htmlFor="name">
                            Rang
                        </label>
                        <input
                            {...register("rankOrder", { required: true })}
                            id="rankOrder"
                            name="rankOrder"
                            className="p-5 mt-3 w-full rounded-xl border border-slate-200"
                            type="number"
                            min="0"
                            placeholder="Tapez le rang de la question"
                        />
                        {errors.rankOrder?.type === "required" && (
                            <p className="text-red-500">Le rang est obligatoire</p>
                        )}
                    </div>
                    <div className="my-4">
                        <label
                            className="font-bold text-green-900 text-xl"
                            htmlFor="firstname"
                        >
                            Question
                        </label>
                        <input
                            {...register("question", { required: true })}
                            id="question"
                            name="question"
                            className="p-5 mt-3 w-full rounded-xl border border-slate-200"
                            type="text"
                            placeholder="Tapez la question ici"
                        />
                        {errors.question?.type === "required" && (
                            <p className="text-red-500">La question est obligatoire</p>
                        )}
                    </div>
                    <div className="my-4">
                        <label className="font-bold text-green-900 text-xl" htmlFor="type">
                            Type de réponse
                        </label>
                        <select
                            {...register("type", { required: true })}
                            id="type"
                            name="type"
                            className="p-5 mt-3 w-full rounded-xl border border-slate-200">
                            <option value="BOOL">Oui/non</option>
                            <option value="TEXT">Texte</option>
                            <option value="TEXTAREA">Texte(long)</option>
                            <option value="R1">QCM Satisfaction</option>
                            <option value="R2">QCM Temporel</option>
                            <option value="NUMBER">Nombres</option>
                            </select>
                            {errors.type?.type === "required" && (
                            <p className="text-red-500">Le type est obligatoire</p>
                        )}
                    </div>
                    <div className="my-4">
                        <label className="font-bold text-green-900 text-xl" htmlFor="formulaire">
                            Formulaire
                        </label>
                        <select
                            {...register("formulaire", { required: true })}
                            id="formulaire"
                            name="formulaire"
                            className="p-5 mt-3 w-full rounded-xl border border-slate-200">
                            <option value="ANAMNESE">Anamnèse</option>
                            <option value="SIXMOIS">Questionnaire 6 mois</option>
                            </select>
                            {errors.formulaire?.type === "required" && (
                            <p className="text-red-500">Le type de formulaire est obligatoire</p>
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
