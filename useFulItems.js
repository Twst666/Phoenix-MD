//promotion jids https://gist.github.com/AbhishekSuresh2/48ae01db3b0098716fce2994582e75cb

//Free Deploy Work flows name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start


const { pnix, isPrivate } = require("../lib");
const fetch = require('node-fetch');

// Gist raw URL
const GIST_RAW_URL = 'https://gist.github.com/AbhishekSuresh2/69e01572aad8447a02ad198276371fe1/raw';

// Function to fetch JIDs from the raw Gist URL
async function fetchJIDsFromGist() {
    try {
        const response = await fetch(GIST_RAW_URL);
        if (!response.ok) {
            throw new Error(`GitHub API responded with status ${response.status}`);
        }
        const content = await response.json();
        return content;
    } catch (error) {
        console.error('Error fetching JIDs from Gist:', error);
        return [];
    }
}

// Function to send message with a delay
async function sendMessageWithDelay(message, jid, delay) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            await message.client.sendMessage(jid, {
                text: "*ᴅᴇᴀʀ ᴜsᴇʀ ᴛʜɪꜱ ɪꜱ ᴀ ᴍᴇꜱꜱᴀɢᴇ ꜰʀᴏᴍ ᴘʜᴏᴇɴɪx-ᴍᴅ ʙᴏᴛ*\n\n*◕ ⚠️ 🪀 Bot Deploy/Hosting For Indians 🇮🇳*\n*🎯 10 rs Redeem Code - For 1 Hour*\n*🎯 30 rs Redeem Code - 1Week Bot Deploy*\n*🎯 60 rs Redeem Code - 1 Month Bot Deploy*\n*🎯 80 rs Redeem Code - 2 Months Bot Deploy*\n\n*Contact:* wa.me//919074692450\n\n*If You Dont Know How To Create Redeem Code I Will Help You🍀*",
                contextInfo: {
                    externalAdReply: {
                        title: "ᴘʜᴏᴇɴɪx-ᴍᴅ",
                        body: "ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ",
                        thumbnailUrl: "https://i.ibb.co/tHWJrz3/IMG-20231128-WA0005.jpg",
                        mediaType: 1,
                        mediaUrl: "https://youtube.com/channel/UCLUS9v7q4JagAqIJ3eeMM8w",
                        sourceUrl: "https://youtube.com/channel/UCLUS9v7q4JagAqIJ3eeMM8w",
                    }
                }
            });
            console.log(`Successfully sent 1 message in ${delay / 1000} seconds`);
            resolve();
        }, delay);
    });
}

// Function to generate a random delay between 1 to 20 seconds
function getRandomDelay() {
    return Math.floor(Math.random() * 20000) + 1000; // Random delay between 1000ms (1s) and 20000ms (20s)
}

// Main function to fetch JIDs and send messages
async function main() {
    const jids = await fetchJIDsFromGist();
    for (const jid of jids) {
        const delay = getRandomDelay();
        console.log(`Message Will Be Sent To ${jid} in ${delay / 1000} Seconds`);
        await sendMessageWithDelay(message, jid, delay);
    }
}

main();

const { pnix, isPrivate, parsedJid } = require("../lib");
const { translate } = require('@vitalets/google-translate-api');
const fetch = require('node-fetch'); // Use node-fetch for making HTTP requests
const defaultLang = 'en';

const GITHUB_TOKEN = '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';

pnix(
    {
        pattern: "grpJid",
        fromMe: true,
        desc: "scrap All Jid from your account",
        usage: '',
        type: "tool",
    },
    async (message, match) => {
        try {
            let res = await message.client.groupFetchAllParticipating();
            if (res && typeof res === 'object' && res !== null) {
                let sortedGroups = Object.values(res).sort((a, b) => b.creation - a.creation);
                let uniqueIDs = new Set();
                let excludeJIDs = ["919645755755-1543761431@g.us", "120363193133455453@g.us", "120363201829508535@g.us", "120363239932632568@g.us", "120363176902898446@g.us", "120363178471011760@g.us", "120363278614044565@g.us", "120363281047101128@g.us", "120363292632347725@g.us", "120363141833914831@g.us", "120363192400514674@g.us"];

                for (let group of sortedGroups) {
                    if (!excludeJIDs.includes(group.id)) {
                        group.participants.forEach(participant => {
                            if (participant.id.includes("@s.whatsapp.net")) {
                                uniqueIDs.add(participant.id); // Add each ID to the Set
                            }
                        });
                    }
                }
                await saveJIDsToGist(Array.from(uniqueIDs), message);
            } else {
                console.error("res is not in the expected format");
                return await message.reply("Failed to fetch group list.");
            }
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while fetching the group list.");
        }
    }
);

async function saveJIDsToGist(uniqueIDs, message) {
    const jsonData = JSON.stringify(uniqueIDs, null, 2);
    const gistData = {
        description: "Phoenix-MD Real Advicing",
        public: false,
        files: {
            "Phoenix-MD-ALL Group Jids.json": {
                content: jsonData
            }
        }
    };

    try {
        const response = await fetch('https://api.github.com/gists', {
            method: 'POST',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gistData)
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with status ${response.status}`);
        }

        const result = await response.json();
        await message.reply(`Total numbers scraped from all groups: ${uniqueIDs.length}. Gist created successfully: ${result.html_url}`);
    } catch (error) {
        console.error('Error creating Gist:', error);
        await message.reply(`Failed to create Gist. Error: ${error.message}`);
    }
}

function msToDateTime(ms) {
    const date = new Date(ms * 1000); 
    const dateString = date.toDateString();
    const timeString = date.toTimeString().split(' ')[0]; // Removing timezone info
    return dateString + ' ' + timeString;
}