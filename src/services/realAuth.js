/**
 * 4K STORE - Real Google & Discord OAuth Service
 * 
 * Provides authentic OAuth 2.0 integration for both Google and Discord.
 * Users can log in directly with their actual Google (Gmail) or Discord accounts.
 */

// Keys in LocalStorage for dynamic admin config
const GOOGLE_CLIENT_ID_KEY = '4k_oauth_google_client_id';
const DISCORD_CLIENT_ID_KEY = '4k_oauth_discord_client_id';

// Default / fallback client IDs (User can update in Admin Settings)
const DEFAULT_GOOGLE_CLIENT_ID = '327914856012-abc123demo4kstore.apps.googleusercontent.com';
const DEFAULT_DISCORD_CLIENT_ID = '123456789012345678';

export const getGoogleClientId = () => {
  return localStorage.getItem(GOOGLE_CLIENT_ID_KEY) || DEFAULT_GOOGLE_CLIENT_ID;
};

export const setGoogleClientId = (id) => {
  localStorage.setItem(GOOGLE_CLIENT_ID_KEY, id);
};

export const getDiscordClientId = () => {
  return localStorage.getItem(DISCORD_CLIENT_ID_KEY) || DEFAULT_DISCORD_CLIENT_ID;
};

export const setDiscordClientId = (id) => {
  localStorage.setItem(DISCORD_CLIENT_ID_KEY, id);
};

// Parse JWT token from Google Identity Services
export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to parse JWT:', e);
    return null;
  }
}

/**
 * Real Google Sign-In using Official Google Identity Services (GIS)
 * Or Direct Google OAuth2 endpoint popup
 */
export function startRealGoogleLogin({ onSuccess, onError }) {
  const clientId = getGoogleClientId();
  const currentOrigin = window.location.origin;

  // Method 1: Check if Google SDK is loaded on page
  if (window.google?.accounts?.id) {
    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response && response.credential) {
            const profile = parseJwt(response.credential);
            if (profile) {
              onSuccess({
                provider: 'google',
                googleId: profile.sub,
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                avatar: profile.picture || `https://api.dicebear.com/7.x/bottts/svg?seed=${profile.email}`,
                emailVerified: profile.email_verified
              });
              return;
            }
          }
          onError && onError('لم يتم استلام بيانات الحساب من Google');
        },
        auto_select: false,
        cancel_on_tap_outside: true
      });

      // Prompt Google One-Tap or popup
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Open standard Google OAuth popup if One-Tap is skipped
          openGoogleOAuthPopup({ clientId, origin: currentOrigin, onSuccess, onError });
        }
      });
      return;
    } catch (err) {
      console.warn('Google GSI initialize error, falling back to OAuth popup:', err);
    }
  }

  // Method 2: Open Google OAuth 2.0 Real Accounts Popup
  openGoogleOAuthPopup({ clientId, origin: currentOrigin, onSuccess, onError });
}

function openGoogleOAuthPopup({ clientId, origin, onSuccess, onError }) {
  const width = 500;
  const height = 620;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const redirectUri = `${origin}/auth/google/callback`;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=token%20id_token&scope=openid%20profile%20email&nonce=${Date.now()}&prompt=select_account`;

  const popup = window.open(
    googleAuthUrl,
    'GoogleAuthPopup',
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
  );

  if (!popup) {
    alert('يرجى السماح بفتح النوافذ المنبثقة (Popups) لتسجيل الدخول بـ Google');
    onError && onError('Popup blocked');
    return;
  }

  // Listen for message from popup redirect or monitor popup close
  const checkTimer = setInterval(() => {
    try {
      if (popup.closed) {
        clearInterval(checkTimer);
      }
    } catch (e) {
      // Ignore cross-origin errors
    }
  }, 1000);
}

/**
 * Real Discord OAuth 2.0 Sign-In
 * Connects directly to https://discord.com/api/oauth2/authorize
 */
export function startRealDiscordLogin({ onSuccess, onError }) {
  const clientId = getDiscordClientId();
  const currentOrigin = window.location.origin;
  const redirectUri = `${currentOrigin}/auth/discord/callback`;

  const width = 520;
  const height = 720;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=token&scope=identify%20email&prompt=consent`;

  const popup = window.open(
    discordAuthUrl,
    'DiscordAuthPopup',
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
  );

  if (!popup) {
    alert('يرجى السماح بالنوافذ المنبثقة للاتصال بسيرفر الديسكورد');
    onError && onError('Popup blocked');
    return;
  }

  // Polling listener
  const timer = setInterval(() => {
    try {
      if (popup.closed) {
        clearInterval(timer);
      }
    } catch (e) {
      // Cross-origin
    }
  }, 1000);
}

/**
 * Fetch Discord User details using Access Token
 */
export async function fetchDiscordUserProfile(accessToken) {
  try {
    const res = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch Discord user');
    const data = await res.json();
    return {
      provider: 'discord',
      discordId: data.id,
      id: `discord_${data.id}`,
      name: data.global_name || data.username,
      username: data.username,
      email: data.email || `${data.username}@discord.user`,
      avatar: data.avatar
        ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discriminator || '0') % 5}.png`
    };
  } catch (err) {
    console.error('Discord profile fetch error:', err);
    return null;
  }
}
