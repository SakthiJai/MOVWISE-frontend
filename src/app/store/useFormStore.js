STORE:


"use client";
import { create } from "zustand";

export const useFormStore = create((set) => ({
  companyData: {},
  quotationData: {},
  notesData: {},

  updateCompanyData: (data) => set({ companyData: data }),
  updateQuotationData: (data) => set({ quotationData: data }),
  updateNotesData: (data) => set({ notesData: data }),

  resetAll: () => set({ companyData: {}, quotationData: {}, notesData: {} }),
}));