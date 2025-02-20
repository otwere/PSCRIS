import React, { useState } from "react";
import { X, Upload, AlertCircle, Camera, Fingerprint, Save } from "lucide-react";
import { useInmate, InmateStatus } from "../contexts/InmateContext";
type BookingFormData = {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: "Male" | "Female" | "Other";
    race: string;
    height: string;
    weight: string;
    eyeColor: string;
    hairColor: string;
    identifyingMarks: string[];
    nationality: string;
    language: string;
    occupation: string;
    education: string;
    religion: string;
    maritalStatus: "Single";
    socialSecurity: string;
    driversLicense: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  charges: Array<{
    charge: string;
    severity: "Felony" | "Misdemeanor";
    court: string;
    arrestingOfficer: string;
    arrestDate: string;
    warrantNumber: string;
    bailAmount: string;
    nextCourtDate: string;
    prosecutingAttorney: string;
  }>;
  booking: {
    status: InmateStatus;
    cellBlock: string;
    cellNumber: string;
    securityLevel: "Minimum" | "Medium" | "Maximum";
    bookingDate: string;
    bookingOfficer: string;
    attorney: string;
    releaseDate: string;
    releasedBy: string;
    releaseReason: string;
    classification: "General Population";
    dietaryRestrictions: string[];
    visitationPrivileges: "Standard";
    specialInstructions: string;
  };
  medical: {
    conditions: string[];
    medications: string[];
    allergies: string[];
    specialNeeds: string[];
    mentalHealth: {
      conditions: string[];
      medications: string[];
      history: string;
    };
    primaryPhysician: string;
    insuranceInfo: string;
    lastMedicalExam: string;
    bloodType: string;
    disabilities: string[];
    currentTreatments: string[];
    pregnancyStatus: "Not Applicable";
    dentalInfo: string;
    optometryInfo: string;
  };
  emergency: {
    primaryContact: {
      name: string;
      relationship: string;
      phone: string;
      alternatePhone: string;
      email: string;
      address: string;
    };
    alternateContact: {
      name: string;
      relationship: string;
      phone: string;
      alternatePhone: string;
      email: string;
      address: string;
    };
    preferredHospital: string;
    medicalPowerOfAttorney: string;
  };
  property: Array<{
    type: string;
    description: string;
    value?: string;
    condition: string;
    storageLocation: string;
    dispositionInstructions: string;
  }>;
};
export const NewBookingModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    addInmate
  } = useInmate();
  const [activeTab, setActiveTab] = useState<"personal" | "charges" | "booking" | "medical" | "emergency" | "property">("personal");
  const [formData, setFormData] = useState<BookingFormData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "Male",
      race: "",
      height: "",
      weight: "",
      eyeColor: "",
      hairColor: "",
      identifyingMarks: [],
      nationality: "",
      language: "",
      occupation: "",
      education: "",
      religion: "",
      maritalStatus: "Single",
      socialSecurity: "",
      driversLicense: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
      }
    },
    charges: [{
      charge: "",
      severity: "Misdemeanor",
      court: "",
      arrestingOfficer: "",
      arrestDate: "",
      warrantNumber: "",
      bailAmount: "",
      nextCourtDate: "",
      prosecutingAttorney: ""
    }],
    booking: {
      status: "Booked",
      cellBlock: "",
      cellNumber: "",
      securityLevel: "Minimum",
      bookingDate: new Date().toISOString().split("T")[0],
      bookingOfficer: "",
      attorney: "",
      releaseDate: "",
      releasedBy: "",
      releaseReason: "",
      classification: "General Population",
      dietaryRestrictions: [],
      visitationPrivileges: "Standard",
      specialInstructions: ""
    },
    medical: {
      conditions: [],
      medications: [],
      allergies: [],
      specialNeeds: [],
      mentalHealth: {
        conditions: [],
        medications: [],
        history: ""
      },
      primaryPhysician: "",
      insuranceInfo: "",
      lastMedicalExam: "",
      bloodType: "",
      disabilities: [],
      currentTreatments: [],
      pregnancyStatus: "Not Applicable",
      dentalInfo: "",
      optometryInfo: ""
    },
    emergency: {
      primaryContact: {
        name: "",
        relationship: "",
        phone: "",
        alternatePhone: "",
        email: "",
        address: ""
      },
      alternateContact: {
        name: "",
        relationship: "",
        phone: "",
        alternatePhone: "",
        email: "",
        address: ""
      },
      preferredHospital: "",
      medicalPowerOfAttorney: ""
    },
    property: [{
      type: "",
      description: "",
      value: "",
      condition: "",
      storageLocation: "",
      dispositionInstructions: ""
    }]
  });
  const [photos, setPhotos] = useState<Array<{
    id: string;
    url: string;
  }>>([]);
  const [fingerprints, setFingerprints] = useState<Array<{
    finger: string;
    image: string;
  }>>([]);
  const renderPersonalTab = () => <div className="space-y-6">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
            <Camera className="h-8 w-8 text-gray-400" />
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Take Photo
          </button>
        </div>
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
            <Fingerprint className="h-8 w-8 text-gray-400" />
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Scan Fingerprints
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.personalInfo.firstName} onChange={e => setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            firstName: e.target.value
          }
        }))} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.personalInfo.lastName} onChange={e => setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            lastName: e.target.value
          }
        }))} required />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Date of Birth
          </label>
          <input type="date" className="w-full px-4 py-2 border rounded-lg" value={formData.personalInfo.dateOfBirth} onChange={e => setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            dateOfBirth: e.target.value
          }
        }))} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select className="w-full px-4 py-2 border rounded-lg" value={formData.personalInfo.gender} onChange={e => setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            gender: e.target.value as "Male" | "Female" | "Other"
          }
        }))}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Race</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.personalInfo.race} onChange={e => setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            race: e.target.value
          }
        }))} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Height</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="5'10''" value={formData.personalInfo.height} onChange={e => setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            height: e.target.value
          }
        }))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Weight</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="180 lbs" value={formData.personalInfo.weight} onChange={e => setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            weight: e.target.value
          }
        }))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Eye Color</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.personalInfo.eyeColor} onChange={e => setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            eyeColor: e.target.value
          }
        }))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Hair Color</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.personalInfo.hairColor} onChange={e => setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            hairColor: e.target.value
          }
        }))} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Identifying Marks
        </label>
        <textarea className="w-full px-4 py-2 border rounded-lg" placeholder="Scars, tattoos, birthmarks, etc." value={formData.personalInfo.identifyingMarks.join("\n")} onChange={e => setFormData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          identifyingMarks: e.target.value.split("\n").filter(Boolean)
        }
      }))} rows={3} />
      </div>
    </div>;
  const renderChargesTab = () => <div className="space-y-6">
      {formData.charges.map((charge, index) => <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Charge #{index + 1}</h3>
            {index > 0 && <button type="button" className="text-red-600 hover:text-red-700 text-sm" onClick={() => setFormData(prev => ({
          ...prev,
          charges: prev.charges.filter((_, i) => i !== index)
        }))}>
                Remove Charge
              </button>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Charge Description
              </label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" value={charge.charge} onChange={e => setFormData(prev => ({
            ...prev,
            charges: prev.charges.map((c, i) => i === index ? {
              ...c,
              charge: e.target.value
            } : c)
          }))} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Severity</label>
              <select className="w-full px-4 py-2 border rounded-lg" value={charge.severity} onChange={e => setFormData(prev => ({
            ...prev,
            charges: prev.charges.map((c, i) => i === index ? {
              ...c,
              severity: e.target.value as "Felony" | "Misdemeanor"
            } : c)
          }))}>
                <option value="Misdemeanor">Misdemeanor</option>
                <option value="Felony">Felony</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Arresting Officer
              </label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" value={charge.arrestingOfficer} onChange={e => setFormData(prev => ({
            ...prev,
            charges: prev.charges.map((c, i) => i === index ? {
              ...c,
              arrestingOfficer: e.target.value
            } : c)
          }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Arrest Date
              </label>
              <input type="date" className="w-full px-4 py-2 border rounded-lg" value={charge.arrestDate} onChange={e => setFormData(prev => ({
            ...prev,
            charges: prev.charges.map((c, i) => i === index ? {
              ...c,
              arrestDate: e.target.value
            } : c)
          }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Warrant Number
              </label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" value={charge.warrantNumber} onChange={e => setFormData(prev => ({
            ...prev,
            charges: prev.charges.map((c, i) => i === index ? {
              ...c,
              warrantNumber: e.target.value
            } : c)
          }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Bail Amount
              </label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" value={charge.bailAmount} onChange={e => setFormData(prev => ({
            ...prev,
            charges: prev.charges.map((c, i) => i === index ? {
              ...c,
              bailAmount: e.target.value
            } : c)
          }))} />
            </div>
          </div>
        </div>)}
      <button type="button" className="text-blue-600 hover:text-blue-700 text-sm" onClick={() => setFormData(prev => ({
      ...prev,
      charges: [...prev.charges, {
        charge: "",
        severity: "Misdemeanor",
        court: "",
        arrestingOfficer: "",
        arrestDate: "",
        warrantNumber: "",
        bailAmount: "",
        nextCourtDate: "",
        prosecutingAttorney: ""
      }]
    }))}>
        + Add Another Charge
      </button>
    </div>;
  const renderMedicalTab = () => <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Medical Conditions</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Current Conditions
            </label>
            <textarea className="w-full px-4 py-2 border rounded-lg" placeholder="Enter medical conditions (one per line)" value={formData.medical.conditions.join("\n")} onChange={e => setFormData(prev => ({
            ...prev,
            medical: {
              ...prev.medical,
              conditions: e.target.value.split("\n").filter(Boolean)
            }
          }))} rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Current Medications
            </label>
            <textarea className="w-full px-4 py-2 border rounded-lg" placeholder="Enter medications (one per line)" value={formData.medical.medications.join("\n")} onChange={e => setFormData(prev => ({
            ...prev,
            medical: {
              ...prev.medical,
              medications: e.target.value.split("\n").filter(Boolean)
            }
          }))} rows={3} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Allergies</label>
          <textarea className="w-full px-4 py-2 border rounded-lg" placeholder="Enter allergies (one per line)" value={formData.medical.allergies.join("\n")} onChange={e => setFormData(prev => ({
          ...prev,
          medical: {
            ...prev.medical,
            allergies: e.target.value.split("\n").filter(Boolean)
          }
        }))} rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Special Needs
          </label>
          <textarea className="w-full px-4 py-2 border rounded-lg" placeholder="Enter special needs (one per line)" value={formData.medical.specialNeeds.join("\n")} onChange={e => setFormData(prev => ({
          ...prev,
          medical: {
            ...prev.medical,
            specialNeeds: e.target.value.split("\n").filter(Boolean)
          }
        }))} rows={3} />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-medium">Mental Health Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Mental Health Conditions
            </label>
            <textarea className="w-full px-4 py-2 border rounded-lg" placeholder="Enter mental health conditions" value={formData.medical.mentalHealth.conditions.join("\n")} onChange={e => setFormData(prev => ({
            ...prev,
            medical: {
              ...prev.medical,
              mentalHealth: {
                ...prev.medical.mentalHealth,
                conditions: e.target.value.split("\n").filter(Boolean)
              }
            }
          }))} rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Mental Health Medications
            </label>
            <textarea className="w-full px-4 py-2 border rounded-lg" placeholder="Enter mental health medications" value={formData.medical.mentalHealth.medications.join("\n")} onChange={e => setFormData(prev => ({
            ...prev,
            medical: {
              ...prev.medical,
              mentalHealth: {
                ...prev.medical.mentalHealth,
                medications: e.target.value.split("\n").filter(Boolean)
              }
            }
          }))} rows={3} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Primary Physician
          </label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.medical.primaryPhysician} onChange={e => setFormData(prev => ({
          ...prev,
          medical: {
            ...prev.medical,
            primaryPhysician: e.target.value
          }
        }))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Blood Type</label>
          <select className="w-full px-4 py-2 border rounded-lg" value={formData.medical.bloodType} onChange={e => setFormData(prev => ({
          ...prev,
          medical: {
            ...prev.medical,
            bloodType: e.target.value
          }
        }))}>
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>
    </div>;
  const renderEmergencyTab = () => <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Primary Emergency Contact</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.emergency.primaryContact.name} onChange={e => setFormData(prev => ({
            ...prev,
            emergency: {
              ...prev.emergency,
              primaryContact: {
                ...prev.emergency.primaryContact,
                name: e.target.value
              }
            }
          }))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Relationship
            </label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.emergency.primaryContact.relationship} onChange={e => setFormData(prev => ({
            ...prev,
            emergency: {
              ...prev.emergency,
              primaryContact: {
                ...prev.emergency.primaryContact,
                relationship: e.target.value
              }
            }
          }))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input type="tel" className="w-full px-4 py-2 border rounded-lg" value={formData.emergency.primaryContact.phone} onChange={e => setFormData(prev => ({
            ...prev,
            emergency: {
              ...prev.emergency,
              primaryContact: {
                ...prev.emergency.primaryContact,
                phone: e.target.value
              }
            }
          }))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg" value={formData.emergency.primaryContact.email} onChange={e => setFormData(prev => ({
            ...prev,
            emergency: {
              ...prev.emergency,
              primaryContact: {
                ...prev.emergency.primaryContact,
                email: e.target.value
              }
            }
          }))} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea className="w-full px-4 py-2 border rounded-lg" value={formData.emergency.primaryContact.address} onChange={e => setFormData(prev => ({
          ...prev,
          emergency: {
            ...prev.emergency,
            primaryContact: {
              ...prev.emergency.primaryContact,
              address: e.target.value
            }
          }
        }))} rows={2} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Preferred Hospital
        </label>
        <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.emergency.preferredHospital} onChange={e => setFormData(prev => ({
        ...prev,
        emergency: {
          ...prev.emergency,
          preferredHospital: e.target.value
        }
      }))} />
      </div>
    </div>;
  const renderPropertyTab = () => <div className="space-y-6">
      {formData.property.map((item, index) => <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Property Item #{index + 1}</h3>
            {index > 0 && <button type="button" className="text-red-600 hover:text-red-700 text-sm" onClick={() => setFormData(prev => ({
          ...prev,
          property: prev.property.filter((_, i) => i !== index)
        }))}>
                Remove Item
              </button>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Item Type
              </label>
              <select className="w-full px-4 py-2 border rounded-lg" value={item.type} onChange={e => setFormData(prev => ({
            ...prev,
            property: prev.property.map((p, i) => i === index ? {
              ...p,
              type: e.target.value
            } : p)
          }))}>
                <option value="">Select Type</option>
                <option value="Clothing">Clothing</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Electronics">Electronics</option>
                <option value="Documents">Documents</option>
                <option value="Money">Money</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Condition
              </label>
              <select className="w-full px-4 py-2 border rounded-lg" value={item.condition} onChange={e => setFormData(prev => ({
            ...prev,
            property: prev.property.map((p, i) => i === index ? {
              ...p,
              condition: e.target.value
            } : p)
          }))}>
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea className="w-full px-4 py-2 border rounded-lg" value={item.description} onChange={e => setFormData(prev => ({
          ...prev,
          property: prev.property.map((p, i) => i === index ? {
            ...p,
            description: e.target.value
          } : p)
        }))} rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Storage Location
              </label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" value={item.storageLocation} onChange={e => setFormData(prev => ({
            ...prev,
            property: prev.property.map((p, i) => i === index ? {
              ...p,
              storageLocation: e.target.value
            } : p)
          }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Estimated Value
              </label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" value={item.value} onChange={e => setFormData(prev => ({
            ...prev,
            property: prev.property.map((p, i) => i === index ? {
              ...p,
              value: e.target.value
            } : p)
          }))} />
            </div>
          </div>
        </div>)}
      <button type="button" className="text-blue-600 hover:text-blue-700 text-sm" onClick={() => setFormData(prev => ({
      ...prev,
      property: [...prev.property, {
        type: "",
        description: "",
        value: "",
        condition: "",
        storageLocation: "",
        dispositionInstructions: ""
      }]
    }))}>
        + Add Another Item
      </button>
    </div>;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingNumber = `B${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
    addInmate({
      bookingNumber,
      ...formData.personalInfo,
      status: formData.booking.status,
      bookingDate: formData.booking.bookingDate,
      charges: formData.charges.map((charge, index) => ({
        id: `CHG-${Date.now()}-${index}`,
        ...charge,
        status: "Pending"
      })),
      cellBlock: formData.booking.cellBlock,
      cellNumber: formData.booking.cellNumber,
      medicalInfo: {
        ...formData.medical,
        lastCheckup: new Date().toISOString().split("T")[0]
      },
      property: formData.property.map((item, index) => ({
        id: `PROP-${Date.now()}-${index}`,
        ...item,
        status: "Stored"
      })),
      visits: [],
      securityLevel: formData.booking.securityLevel,
      attorney: formData.booking.attorney,
      emergencyContact: formData.emergency.primaryContact,
      notes: [{
        id: `NOTE-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        type: "Booking",
        content: "Initial booking completed",
        officer: formData.booking.bookingOfficer
      }]
    });
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">New Inmate Booking</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="border-b">
          <nav className="flex">
            {(["personal", "charges", "booking", "medical", "emergency", "property"] as const).map(tab => <button key={tab} className={`px-4 py-2 font-medium text-sm ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>)}
          </nav>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          {activeTab === "personal" && renderPersonalTab()}
          {activeTab === "charges" && renderChargesTab()}
          {activeTab === "medical" && renderMedicalTab()}
          {activeTab === "emergency" && renderEmergencyTab()}
          {activeTab === "property" && renderPropertyTab()}
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Complete Booking
            </button>
          </div>
        </form>
      </div>
    </div>;
};