import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import platformImg from "../../assets/Img/platformImg.png";
import { CgArrowTopRight, CgProfile } from 'react-icons/cg';
import { MdCloudDownload, MdOutlineSecurity, MdWorkOutline } from 'react-icons/md';
import Swal from 'sweetalert2';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import PlansBox from '../../Components/PlansBox';
import { Link } from 'react-router-dom';

const PlatformManagement = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';


  const servicesFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      whatsapp_number: "",
      details: "",
      social_links: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "cant be less than 3 letters")
        .max(20, "cant be more than 20 letters")
        .required("name is invalid"),

      email: Yup.string()
        .min(15, "يجب أن لا يقل عن 15 حرف")
        .email("enter the correct email")
        .required("this is invalid"),

      number: Yup.string()
        .matches(/^(010|011|012|015)[0-9]{8}$/, "يجب أن يكون رقمًا مصريًا صحيحًا")
        .required("رقم الهاتف مطلوب"),

      whatsapp_number: Yup.string()
        .matches(/^(010|011|012|015)[0-9]{8}$/, "يجب أن يكون رقمًا مصريًا صحيحًا")
        .required("رقم الهاتف مطلوب"),

      details: Yup.string()
        .min(10, "cant be less than 10 letters")
        .max(500, "cant be more than 500 letters"),

      social_links: Yup.string()
        .url("enter the correct url")
        .required("social links is required"),

    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          title: "يجب تسجيل الدخول",
          text: "يجب عليك تسجيل الدخول أولًا لمتابعة العملية.",
          icon: "warning",
          confirmButtonText: "تسجيل الدخول",
        }).then(() => {
          window.location.href = "/Register";
        });

        return;
      }

      try {
        const formData = new FormData();
        formData.append("selectedService", selectedService);
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("number", values.number);
        formData.append("whatsapp_number", values.whatsapp_number);
        formData.append("details", values.details);
        formData.append("social_links", values.social_links);


        const response = await axios.post("http://127.0.0.1:8000/api/servicesOrder", formData, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "تم التسجيل بنجاح",
            text: "تم إرسال البيانات بنجاح",
            icon: "success",
          });
          formik.resetForm();
          setImagePreview("");
          setShowForm(false);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            Swal.fire({
              title: "لقد أرسلت طلبًا بالفعل!",
              text: "طلبك قيد المراجعة، يرجى الانتظار حتى يتم الرد.",
              icon: "warning",
            });
          } else {
            Swal.fire({
              title: "خطأ",
              text: error.response.data.message || "حدث خطأ أثناء التسجيل",
              icon: "error",
            });
          }
        } else {
          Swal.fire({
            title: "خطأ",
            text: "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى لاحقًا.",
            icon: "error",
          });
        }
      }
    }

  });


  const plans = [
    {
      name: 'plans.starter',
      price: 20,
      priceYearly: 200,
      features: [
        'plans.features.content_protection',
        'plans.features.revenue_security',
        'plans.features.artist_platform_protection',
        'plans.features.artist_profile',
        'plans.features.real_job_opportunities',
        'plans.features.no_ads',
        'plans.features.easy_browsing',
      ],
    },
    {
      name: 'plans.pro_tune',
      price: 40,
      priceYearly: 425,
      features: [
        'plans.features.content_protection',
        'plans.features.revenue_security',
        'plans.features.artist_platform_protection',
        'plans.features.artist_profile',
        'plans.features.real_job_opportunities',
        'plans.features.exclusive_marketing',
        'plans.features.no_ads',
        'plans.features.easy_browsing',
      ],
    },
  ];

  return (
    <div className="p-6 flex justify-center">
      <div className="max-w-6xl mt-22 h-[100%] bg-white p-10 rounded-lg w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className='flex flex-col items-center md:items-start'>
            <h1 className="text-5xl font-bold mb-12 md:text-start text-center">
              {t("platforms_management")}
            </h1>
            <p className="text-lg text-gray-600 font-bold mb-8 md:text-start text-center">
              {t("platforms_management_desc")}
            </p>
            <div className="flex gap-4">
              <button className="bg-[#2F00AC] hover:bg-white hover:text-black border border-[#2F00AC] transition-all duration-300 ease-in-out text-white px-6 py-2 rounded-lg font-semibold"
                onClick={() => {
                  setModalOpen(true);
                  setSelectedService("Platform Management Free Trial");
                }}
              >
                {t("start_free_trial")}
              </button>
              <Link to={"#plans"} className="border text-[#2F00AC] hover:text-white hover:bg-[#2F00AC] border-[#2F00AC] transition-all duration-300 ease-in-out px-6 py-2 rounded-lg font-semibold">
                {t("request_demo")}
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <img
              src={platformImg}
              alt={t("platform_illustration")}
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-10">
          {[
            { title: t("artist_profile"), desc: t("artist_profile_desc"), icon: <CgProfile /> },
            { title: t("providing_real_job"), desc: t("providing_real_job_desc"), icon: <MdWorkOutline /> },
            { title: t("direct_download"), desc: t("direct_download_desc"), icon: <MdCloudDownload /> },
            { title: t("data_security"), desc: t("data_security_desc"), icon: <MdOutlineSecurity /> },
            { title: t("ensuring_successful"), desc: t("ensuring_successful_desc"), icon: <CgArrowTopRight /> }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-xl flex flex-col items-center text-center md:items-start md:text-start">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{feature.desc}</p>
              <div className="text-3xl bg-[#2F00AC1A] rounded-full text-[#2F00AC] w-12 h-12 flex items-center justify-center">
                {feature.icon}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center flex-col mt-12">
          <h1 className="text-4xl font-bold text-center">{t("pricing_title")}</h1>
          <p className="text-center text-lg text-black mt-8">{t("pricing_subtitle")}</p>

          <div id='plans' className={`grid gap-10 grid-cols-1 md:grid-cols-2 mt-12 ${isRTL ? 'text-right' : 'text-left'}`}>
            {plans.map((plan, index) => (
              <PlansBox
                key={index}
                planName={t(plan.name)}
                MainPrice={plan.price}
                addPrice={plan.priceYearly}
                Features={plan.features.map(feature => t(feature))}
              />
            ))
            }
          </div>
        </div>
      </div>
      {
        modalOpen ? (
          <div aria-hidden="true" className="flex bg-[#000000bf] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-4 w-full md:w-1/2 max-h-full">
              <div className="relative bg-white rounded-3xl shadow-sm">
                <div className="flex items-center justify-between p-4 md:p-5">
                  <h2 className="text-xl font-semibold text-[#522ED3]">{t("modal.title")}</h2>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  >
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">{t("modal.close")}</span>
                  </button>
                </div>

                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={servicesFormik.handleSubmit}>
                    {["name", "email", "number", "whatsapp_number", "social_links", "details"].map((field) => (
                      <div key={field} className="mb-6">
                        <label htmlFor={field} className="block mb-2 text-sm font-medium text-[#522ED3]">
                          {t(`modal.${field}`)}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          onChange={servicesFormik.handleChange}
                          value={servicesFormik.values[field]}
                          name={field}
                          id={field}
                          className="border-b border-[#522ED3] text-gray-900 text-sm outline-none focus-visible:outline-0 block w-full p-2.5"
                          placeholder={t(`modal.${field}`)}
                        />
                        {servicesFormik.touched[field] && servicesFormik.errors[field] ? (
                          <small className="text-red-500">{servicesFormik.errors[field]}</small>
                        ) : null}
                      </div>
                    ))}

                    <button type="submit" className="w-full bg-[#522ED3] text-white border border-[#522ED3] hover:bg-white hover:text-[#522ED3] font-bold rounded-full px-6 py-3 text-center">
                      {t("modal.send")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
    </div>
  );
}

export default PlatformManagement;
