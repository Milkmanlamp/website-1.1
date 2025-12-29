import React from 'react';

const styles = {
    container: {
        width: '100%',
        backgroundColor: '#f6f7fb',
        padding: '24px 0',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#111827',
    },
    card: {
        maxWidth: '640px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
    },
    header: {
        backgroundColor: '#111827',
        color: '#ffffff',
        padding: '16px 20px',
        fontSize: '18px',
        fontWeight: 'bold',
        letterSpacing: '0.2px',
    },
    section: {
        padding: '20px',
    },
    label: {
        fontSize: '12px',
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: '0.4px',
        marginBottom: '4px',
        display: 'block',
    },
    value: {
        fontSize: '16px',
        color: '#111827',
        margin: 0,
    },
    row: {
        width: '100%',
        borderTop: '1px solid #f3f4f6',
        paddingTop: '16px',
        marginTop: '16px',
    },
    grid: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    col: {
        verticalAlign: 'top',
        width: '50%',
        paddingRight: '12px',
    },
    footer: {
        fontSize: '12px',
        color: '#6b7280',
        padding: '16px 20px',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #e5e7eb',
    },
    badge: {
        display: 'inline-block',
        padding: '2px 8px',
        backgroundColor: '#eef2ff',
        color: '#3730a3',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 600,
    },
    pre: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: '14px',
        lineHeight: 1.5,
        backgroundColor: '#f9fafb',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        margin: 0,
    },
};

function Row({ label, children }) {
    return (
        <div style={styles.row}>
            <span style={styles.label}>{label}</span>
            <p style={styles.value}>{children}</p>
        </div>
    );
}

export default function EmailTemplate(props) {
    const {
        firstName = '',
        lastName = '',
        email = '',
        phone = '',
        type = '',
        description = '',
        package: selectedPackage = '',
        addons = '',
        contact = '',
    } = props || {};

    const fullName = [firstName, lastName].filter(Boolean).join(' ').trim() || 'N/A';
    const safe = (v) => (v === undefined || v === null || v === '' ? 'N/A' : String(v));

    // If addons might be an array/object, render nicely
    const renderAddons = (() => {
        if (Array.isArray(addons)) return addons.length ? addons.join(', ') : 'None';
        if (typeof addons === 'object' && addons) return JSON.stringify(addons);
        return safe(addons) === 'N/A' ? 'None' : safe(addons);
    })();

    return (
        <div style={styles.container}>
            <table role="presentation" style={styles.card}>
                <tbody>
                <tr>
                    <td style={styles.header}>
                        New Website Enquiry
                    </td>
                </tr>
                <tr>
                    <td style={styles.section}>
                        <table role="presentation" style={styles.grid}>
                            <tbody>
                            <tr>
                                <td style={styles.col}>
                                    <span style={styles.label}>Customer</span>
                                    <p style={styles.value}>{fullName}</p>
                                </td>
                                <td style={styles.col}>
                                    <span style={styles.label}>Preferred Contact</span>
                                    <p style={styles.value}>
                                                <span style={styles.badge}>
                                                    {contact === 'phone' ? 'Phone' : contact === 'email' ? 'Email' : safe(contact)}
                                                </span>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <Row label="Email">{safe(email)}</Row>
                        <Row label="Phone">{safe(phone)}</Row>
                        <Row label="Project Type">{safe(type)}</Row>
                        <Row label="Selected Package">{safe(selectedPackage)}</Row>
                        <Row label="Add‑ons">{renderAddons}</Row>

                        <div style={styles.row}>
                            <span style={styles.label}>Project Description</span>
                            <pre style={styles.pre}>{safe(description)}</pre>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={styles.footer}>
                        You're receiving this email because a new enquiry was submitted via your website.
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

