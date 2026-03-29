import React, { useEffect } from 'react';
import Navigation from '../components/layout/Navigation.jsx';
import Footer from '../components/layout/Footer.jsx';
import privacyHtml from '../content/privacy-policy.html?raw';

const PrivacyPolicyPage = () => {
    useEffect(() => {
        document.title = "Aseryx | Privacy Policy";
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-brand-coral selection:text-black overflow-x-hidden">
            <Navigation />

            <main id="main-content" className="pt-24 pb-16 px-4 md:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 md:p-12">
                    <div dangerouslySetInnerHTML={{ __html: privacyHtml }} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicyPage;
