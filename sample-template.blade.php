<p>Index</p>
{{\EvoPhp\Api\Operations::getIndex()}}

<p>Access and create section model</p>
@if(\EvoPhp\Api\Operations::checkAccess("13"))
    @section('menu-members')
    @show
@endif

<p>Render section model</p>
@section('menu-members')

@endsection

<p>Go back button</p>
<a href="javaScript:void(0)" id="goBackBtn">Go Back</a>

<p>Content display</p>
@section('content')
    @yield('content') 
@show

<p>Links</p>
{{$links['recoverPassword']}}
{{$links['registration']}}
{{$loginLink}}

<p>Assets</p>
@section('assets', '/Public/Themes/Investment.theme/assets/')