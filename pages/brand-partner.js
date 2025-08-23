import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import CommonbgBanner from "@/Components/Common/CommonbgBanner";
import { toast } from "react-toastify";
import postRequest from "@/lib/postRequest";

const validationSchema = Yup.object({
  // Personal Information
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    .required("Phone number is required"),
  location: Yup.string().required("Location is required"),

  // Social Media Information
  primaryPlatform: Yup.string().required("Primary platform is required"),
  instagramHandle: Yup.string().matches(
    /^@?[a-zA-Z0-9._]+$/,
    "Invalid Instagram handle"
  ),
  instagramFollowers: Yup.number().min(
    0,
    "Followers must be a positive number"
  ),
  youtubeChannel: Yup.string(),
  youtubeSubscribers: Yup.number().min(
    0,
    "Subscribers must be a positive number"
  ),
  tiktokHandle: Yup.string(),
  tiktokFollowers: Yup.number().min(0, "Followers must be a positive number"),

  // Content Information
  contentTypes: Yup.array()
    .min(1, "Please select at least one content type")
    .required("Content types are required"),
  postingFrequency: Yup.string().required("Posting frequency is required"),
  averageEngagement: Yup.string().required("Average engagement is required"),

  // Brand Alignment
  whyPartner: Yup.string()
    .min(50, "Please provide at least 50 characters")
    .required("Please tell us why you want to partner with us"),
  brandValues: Yup.string()
    .min(30, "Please provide at least 30 characters")
    .required("Please describe how you align with our brand values"),

  // Collaboration Preferences
  collaborationTypes: Yup.array()
    .min(1, "Please select at least one collaboration type")
    .required("Collaboration types are required"),
  productInterests: Yup.array()
    .min(1, "Please select at least one product category")
    .required("Product interests are required"),

  // Additional Information
  mediaKit: Yup.string()
    .url("Please provide a valid URL")
    .required("Media kit URL is required"),
  additionalInfo: Yup.string(),
});

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  primaryPlatform: "",
  instagramHandle: "",
  instagramFollowers: "",
  youtubeChannel: "",
  youtubeSubscribers: "",
  tiktokHandle: "",
  tiktokFollowers: "",
  contentTypes: [],
  postingFrequency: "",
  averageEngagement: "",
  whyPartner: "",
  brandValues: "",
  collaborationTypes: [],
  productInterests: [],
  mediaKit: "",
  additionalInfo: "",
};

export default function BrandPartnerPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    const res = await postRequest("become-brand-partner", values);

    if (res?.status === 200 || res?.status === true) {
      toast.success(res?.message || "Submitted successfully!");
      resetForm();
      setIsSubmitted?.(true); // safe call if function exists
    } else {
      toast.error(res?.message || "Submission failed, please try again.");
    }
  } catch (error) {
    console.error("Submission error:", error);
    toast.error(
      error?.response?.data?.message ||
        "Something went wrong!, please try again."
    );
  } finally {
    setSubmitting(false);
  }
};


  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-light mb-4 tracking-wide">Thank You!</h1>
          <p className="text-gray-600 text-lg mb-8">
            Your brand partnership application has been submitted successfully.
            Our team will review your application and get back to you within 3-5
            business days.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CommonbgBanner
        name={"BECOME A BRAND PARTNER"}
        helperText={
          "Join our exclusive community of beauty influencers and content creators"
        }
        nameClass="md:!text-4xl"
      />

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-12">
              {/* Personal Information */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-light mb-6 tracking-wide">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Field
                      name="fullName"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Field
                      name="phone"
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <Field
                      name="location"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      placeholder="City, Country"
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Information */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-light mb-6 tracking-wide">
                  Social Media Information
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Platform *
                  </label>
                  <Field
                    as="select"
                    name="primaryPlatform"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select your primary platform</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="blog">Blog/Website</option>
                  </Field>
                  <ErrorMessage
                    name="primaryPlatform"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram Handle
                    </label>
                    <Field
                      name="instagramHandle"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      placeholder="@yourusername"
                    />
                    <ErrorMessage
                      name="instagramHandle"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram Followers
                    </label>
                    <Field
                      name="instagramFollowers"
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      placeholder="10000"
                    />
                    <ErrorMessage
                      name="instagramFollowers"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube Channel
                    </label>
                    <Field
                      name="youtubeChannel"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      placeholder="Channel URL or Name"
                    />
                    <ErrorMessage
                      name="youtubeChannel"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube Subscribers
                    </label>
                    <Field
                      name="youtubeSubscribers"
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      placeholder="5000"
                    />
                    <ErrorMessage
                      name="youtubeSubscribers"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TikTok Handle
                    </label>
                    <Field
                      name="tiktokHandle"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      placeholder="@yourusername"
                    />
                    <ErrorMessage
                      name="tiktokHandle"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TikTok Followers
                    </label>
                    <Field
                      name="tiktokFollowers"
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      placeholder="15000"
                    />
                    <ErrorMessage
                      name="tiktokFollowers"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Content Information */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-light mb-6 tracking-wide">
                  Content Information
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Content Types * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "Beauty Tutorials",
                      "Product Reviews",
                      "Skincare Routines",
                      "Makeup Looks",
                      "Lifestyle Content",
                      "Educational Content",
                    ].map((type) => (
                      <label
                        key={type}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Field
                          type="checkbox"
                          name="contentTypes"
                          value={type}
                          className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage
                    name="contentTypes"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Posting Frequency *
                    </label>
                    <Field
                      as="select"
                      name="postingFrequency"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select posting frequency</option>
                      <option value="daily">Daily</option>
                      <option value="few-times-week">Few times a week</option>
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </Field>
                    <ErrorMessage
                      name="postingFrequency"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Engagement Rate *
                    </label>
                    <Field
                      as="select"
                      name="averageEngagement"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select engagement rate</option>
                      <option value="1-3%">1-3%</option>
                      <option value="3-5%">3-5%</option>
                      <option value="5-10%">5-10%</option>
                      <option value="10%+">10%+</option>
                    </Field>
                    <ErrorMessage
                      name="averageEngagement"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Brand Alignment */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-light mb-6 tracking-wide">
                  Brand Alignment
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why do you want to partner with Laxzin? *
                    </label>
                    <Field
                      as="textarea"
                      name="whyPartner"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us what attracts you to our brand and how you see yourself representing Laxzin..."
                    />
                    <ErrorMessage
                      name="whyPartner"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How do you align with our brand values? *
                    </label>
                    <Field
                      as="textarea"
                      name="brandValues"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Describe how your content and values align with natural beauty, authenticity, and self-care..."
                    />
                    <ErrorMessage
                      name="brandValues"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Collaboration Preferences */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-light mb-6 tracking-wide">
                  Collaboration Preferences
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Collaboration Types * (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Product Gifting",
                        "Paid Partnerships",
                        "Affiliate Marketing",
                        "Long-term Brand Ambassador",
                        "Event Collaborations",
                        "Content Creation",
                      ].map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <Field
                            type="checkbox"
                            name="collaborationTypes"
                            value={type}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage
                      name="collaborationTypes"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Product Interests * (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Hair Care",
                        "Skin Care",
                        "Face Care",
                        "Body Care",
                        "Natural Oils",
                        "Anti-Aging",
                      ].map((category) => (
                        <label
                          key={category}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <Field
                            type="checkbox"
                            name="productInterests"
                            value={category}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="text-sm text-gray-700">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage
                      name="productInterests"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-light mb-6 tracking-wide">
                  Additional Information
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Media Kit URL *
                    </label>
                    <Field
                      name="mediaKit"
                      type="url"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      placeholder="https://your-media-kit-url.com"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Please provide a link to your media kit, portfolio, or
                      relevant work samples
                    </p>
                    <ErrorMessage
                      name="mediaKit"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <Field
                      as="textarea"
                      name="additionalInfo"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Any additional information you'd like to share with us..."
                    />
                    <ErrorMessage
                      name="additionalInfo"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white px-12 py-4 text-lg font-medium hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Submitting Application..."
                    : "Submit Application"}
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  By submitting this form, you agree to our terms and conditions
                  for brand partnerships.
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
