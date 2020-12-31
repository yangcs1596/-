<template>
  <div style="display: inline-flex; padding: 10px;">
  <rotate3DCard trigger="hover" direction="col">
    <!--row 或者 col-->
    <slot name="cz"></slot>
    <slot name="cf"></slot>
  </rotate3DCard>
  </div>
</template>

<script>
  import rotate3DCard from '@/components/3D/retote3DCard';

  export default {
    name: 'Flipper',
    components: {
      rotate3DCard
    }
  };
</script>
