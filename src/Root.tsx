import React from 'react';
import { Composition } from 'remotion';
import {
    EmpireDownfallSequence,
    empireDownfallSequenceSchema,
    EMPIRE_DOWNFALL_SEQUENCE_DURATION,
} from './broll/EmpireDownfallSequence';
import {
    SingleDadDilemmaVox,
    singleDadDilemmaVoxSchema,
    SINGLE_DAD_DILEMMA_VOX_DURATION,
} from './broll/SingleDadDilemmaVox';
import { VoxBook, voxBookSchema, VoxThumbnail, thumbnailSchema } from './broll/voxkit';
import { AntidoteBook, antidoteBookSchema, AntidoteThumbnail, antidoteThumbPropsSchema } from './engines/antidote';
import { CastSheet } from './engines/antidote/CastSheet';
import { BOOKS, ANTIDOTE_BOOKS, BOOK_PALETTES, type Palette } from './books.generated';

const DEFAULT_PALETTE: Palette = { paper: '#EAF0E8', ink: '#1E2A24', red: '#F0A63C', gold: '#3E8E7A' };
const paletteFor = (slug: string): Palette => BOOK_PALETTES[slug] ?? DEFAULT_PALETTE;

export const RemotionRoot: React.FC = () => {
    return (
        <>
            {/* Vox-style motion-graphics reference sequence (30fps, 1920x1080). */}
            <Composition
                id="EmpireDownfallSequence"
                component={EmpireDownfallSequence}
                durationInFrames={EMPIRE_DOWNFALL_SEQUENCE_DURATION}
                fps={30}
                width={1920}
                height={1080}
                schema={empireDownfallSequenceSchema}
                defaultProps={{}}
            />
            {/* Book-summary Vox sample: "Single Dad Dilemma" opening, timed to captions.vtt. */}
            <Composition
                id="SingleDadDilemmaVox"
                component={SingleDadDilemmaVox}
                durationInFrames={SINGLE_DAD_DILEMMA_VOX_DURATION}
                fps={30}
                width={1920}
                height={1080}
                schema={singleDadDilemmaVoxSchema}
                defaultProps={{}}
            />
            {/* Antidote engine (2nd engine, coexists with Vox): flat-vector rigged
                characters + kinetic text + subtitles, CPU-cheap (SVG, no WebGL).
                One AntidoteBook per books/<slug>/config.antidote.json — auto-registered. */}
            {/* Dev reference: the parametric Everyman cast (not a book). */}
            <Composition
                id="Antidote-cast-sheet"
                component={CastSheet}
                durationInFrames={1}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{}}
            />
            {/* Dev reference: the Antidote flat-vector thumbnail identity (not a book). */}
            <Composition
                id="Antidote-thumb-sample"
                component={AntidoteThumbnail}
                durationInFrames={1}
                fps={30}
                width={1280}
                height={720}
                schema={antidoteThumbPropsSchema}
                defaultProps={{
                    title: 'Hidden Potential',
                    author: 'by Adam Grant',
                    hook: 'You Were Mismeasured',
                    ...paletteFor('hidden-potential'),
                    accent: paletteFor('hidden-potential').red,
                    variant: { skin: '#E7B489', hair: '#3A2A22', suit: '#3E8E7A', shirt: '#FFFFFF', expression: 'happy', hairStyle: 'short', glasses: false, beard: 'none', gender: 'f', age: 'adult', outfit: 'casual' },
                    action: 'celebrate',
                    expression: 'happy',
                    motif: 'risingBars',
                }}
            />
            {ANTIDOTE_BOOKS.map((b) => {
                const pal = paletteFor(b.slug);
                const t = b.config.meta.thumbnail;
                return (
                    <React.Fragment key={b.slug}>
                        <Composition
                            id={`Antidote-${b.slug}`}
                            component={AntidoteBook}
                            durationInFrames={b.config.meta.durationInFrames}
                            fps={b.config.meta.fps}
                            width={b.config.meta.width}
                            height={b.config.meta.height}
                            schema={antidoteBookSchema}
                            defaultProps={{ config: b.config }}
                        />
                        {b.engine === 'antidote' && t ? (
                            <Composition
                                id={`Thumb-${b.slug}`}
                                component={AntidoteThumbnail}
                                durationInFrames={1}
                                fps={30}
                                width={1280}
                                height={720}
                                schema={antidoteThumbPropsSchema}
                                defaultProps={{
                                    title: b.config.meta.title,
                                    author: b.config.meta.author ? 'by ' + b.config.meta.author : '',
                                    hook: t.hook,
                                    paper: pal.paper,
                                    ink: pal.ink,
                                    accent: pal.red,
                                    gold: pal.gold,
                                    variant: t.variant,
                                    action: t.action,
                                    expression: t.expression,
                                    motif: t.motif,
                                }}
                            />
                        ) : null}
                    </React.Fragment>
                );
            })}
            {/* Auto-Pipeline: one VoxBook + one thumbnail per book in src/books.generated.ts
                (regenerated by scripts/gen-books-registry.js — never edit this list by hand). */}
            {BOOKS.map((b) => (
                <React.Fragment key={b.slug}>
                    <Composition
                        id={`Vox-${b.slug}`}
                        component={VoxBook}
                        durationInFrames={b.config.meta.totalFrames}
                        fps={b.config.meta.fps}
                        width={b.config.meta.width}
                        height={b.config.meta.height}
                        schema={voxBookSchema}
                        defaultProps={{ config: b.config }}
                    />
                    {b.meta && b.engine !== 'antidote' ? (
                        <Composition
                            id={`Thumb-${b.slug}`}
                            component={VoxThumbnail}
                            durationInFrames={1}
                            fps={30}
                            width={1280}
                            height={720}
                            schema={thumbnailSchema}
                            defaultProps={{
                                title: b.meta.title,
                                author: b.meta.author ? 'by ' + b.meta.author : '',
                                hook: b.meta.thumbnail.hook,
                                heroCut: b.meta.thumbnail.cut,
                                heroImg: b.meta.thumbnail.image,
                                slug: b.slug,
                            }}
                        />
                    ) : null}
                </React.Fragment>
            ))}
        </>
    );
};
