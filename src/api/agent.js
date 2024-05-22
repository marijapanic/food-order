const domain ="http://localhost:3000";

export default function resourceLink(imgSrc)
{
    return `${domain}/${imgSrc}`;
}

export function SubmitOrder(orderParams)
{
    fetch(`${domain}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderParams)
    });
}