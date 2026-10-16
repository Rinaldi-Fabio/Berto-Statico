// Copia statica del sito Astro "Da Berto" (cartella ../dist, già compilata) per GitHub Pages.
// Legge soltanto ../dist: il progetto non viene toccato. Uso: node esporta.mjs → poi git add -A, commit, push.
// Se cambi i sorgenti, prima ricompila nel progetto con `npm run build`.
import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = '/Berto-Statico/'; // GitHub Pages serve il sito sotto https://rinaldi-fabio.github.io/Berto-Statico/
const OUT = dirname( fileURLToPath( import.meta.url ) );
const DIST = join( OUT, '..', 'dist' );
const KEEP = new Set( [ '.git', '.gitattributes', '.nojekyll', 'esporta.mjs', 'README.md' ] );

// Rimuove l'esportazione precedente e ricopia dist.
for ( const f of await readdir( OUT ) ) if ( ! KEEP.has( f ) ) await rm( join( OUT, f ), { recursive: true } );
for ( const f of await readdir( DIST ) ) await cp( join( DIST, f ), join( OUT, f ), { recursive: true, filter: ( s ) => ! basename( s ).startsWith( '._' ) } );

// Indirizzi che iniziano con "/" (es. href="/menu/") → sotto BASE. Indirizzi assoluti: valgono anche nella 404.
let n = 0;
for ( const f of await readdir( OUT, { recursive: true } ) ) {
	if ( ! f.endsWith( '.html' ) ) continue;
	const file = join( OUT, f );
	const html = ( await readFile( file, 'utf8' ) )
		.replace( /((?:href|src|content|action)=["'])\/(?!\/)/g, `$1${ BASE }` )
		.replace( /<link rel="canonical"[^>]*>\n?/g, '' )
		.replace( /<head>/, '<head>\n<meta name="robots" content="noindex, nofollow">' );
	await writeFile( file, html );
	n++;
}
console.log( `${ n } pagine HTML sistemate sotto ${ BASE }` );
