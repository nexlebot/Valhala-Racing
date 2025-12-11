import React from 'react';
import { InfoShowCaseProps } from './types';

export const InfoShowCase: React.FC<{ data: InfoShowCaseProps }> = ({ data }) => {
    const {
        name,
        age,
        breed,
        purchasePrice,
        location,
        saleYear,
        pedigree,
        familyOfChampions,
        presenceAndPotential,
        investmentOpportunity,
        expressionOfInterest
    } = data;

    return (
        <div className=" py-6 lg:py-14 bg-white">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-semibold mb-2" style={{ color: '#1ADB04' }}>
                    {name}
                </h1>
                <div className="text-gray-700 space-y-1">
                    <p><span className="font-semibold">Age:</span> {age}</p>
                    <p><span className="font-semibold">Breed:</span> {breed}</p>
                    <p style={{ color: '#1ADB04' }} className="font-medium text-base lg:text-lg mt-2">
                        Purchase Price: {purchasePrice} (Lot {location.lot} – {location.venue} {saleYear})
                    </p>
                </div>
            </div>

            {/* Elite Pedigree Section */}
            <div className="mb-6">
                <h2 className="text-xl font-medium mb-3" style={{ color: '#1ADB04' }}>
                    {pedigree.title}
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed text-sm lg:text-base">
                    {pedigree.description}
                </p>
            </div>

            {/* Family of Champion Section */}
            <div className="mb-6  text-sm lg:text-base">
                <h2 className="text-xl font-medium mb-3" style={{ color: '#1ADB04' }}>
                    {familyOfChampions.title}
                </h2>
                <p className="text-gray-700 mb-3 leading-relaxed">
                    {familyOfChampions.description}
                </p>
                <ul className="space-y-2 ml-5">
                    {familyOfChampions.relatives.map((relative, index) => (
                        <li key={index} className="text-gray-700 list-disc ml-4">
                            <span className="">{relative.relation}:</span> {relative.details}
                        </li>
                    ))}
                </ul>
                <p className="text-gray-700 mt-3 leading-relaxed">
                    {familyOfChampions.note}
                </p>
            </div>

            {/* Presence, Poise, and Potential Section */}
            <div className="mb-6  text-sm lg:text-base">
                <h2 className="text-xl font-medium mb-3" style={{ color: '#1ADB04' }}>
                    {presenceAndPotential.title}
                </h2>
                <p className="text-gray-700 mb-3 leading-relaxed">
                    {presenceAndPotential.physical}
                </p>
                <p className="text-gray-700 leading-relaxed">
                    {presenceAndPotential.temperament}
                </p>
            </div>

            {/* Investment Opportunity Section */}
            <div className="mb-6  text-sm lg:text-base" >
                <h2 className="text-xl font-medium mb-3" style={{ color: '#1ADB04' }}>
                    {investmentOpportunity.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    {investmentOpportunity.description}
                </p>
            </div>

            {/* Expression of Interest Section */}
            <div className="mb-6  text-sm lg:text-base">
                <h2 className="text-xl font-medium mb-3" style={{ color: '#1ADB04' }}>
                    {expressionOfInterest.title}
                </h2>
                <p className="text-gray-700 mb-2">
                    {expressionOfInterest.question}
                </p>
                <p className="text-gray-700">
                    {expressionOfInterest.callToAction}
                </p>
            </div>
        </div>
    );
};
